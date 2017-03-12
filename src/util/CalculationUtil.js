"use strict";

const Matrix = require('ml-matrix');
const svd = Matrix.DC.SVD;
const Stat = require('ml-stat').matrix;
const mean = Stat.mean;

const { WorkerTaskNames, WorkerUtil } = require('./WorkerUtil');


/**
 * Provides methods for calculations.
 */
class CalculationUtil {

    /**
     * Asynchronously calculates PCA.
     * @param datasets {Array} All datasets with entries
     * @returns {Promise} that will resolve with a calculated PCA or null.
     */
    static calculatePcaAsync(datasets) {
        return WorkerUtil.execByWorker(WorkerTaskNames.CALCULATE_PCA, datasets);
    }

    /**
     * Synchronously calculates PCA. This should be called only by a worker process!
     * @param datasets {Array} All datasets with entries
     * @returns {Object} a calculated PCA or null.
     */
    static calculatePcaSync(datasets) {
        const pcaCalc = new Calculator();
        return pcaCalc.calculatePca(datasets);
    }

    /**
     * Asynchronously calculates areas.
     * @param pca {Object} Calculated PCA
     * @param eigens {[number]} Selected eigenpairs indexes
     * @returns {Promise} that will resolve with a calculated PCA or null.
     */
    static calculateAreasAsync(pca, eigens) {
        return WorkerUtil.execByWorker(WorkerTaskNames.CALCULATE_AREAS, {pca, eigens});
    }

    /**
     * Synchronously calculates areas. This should be called only by a worker process!
     * @param pca {Object} Calculated PCA
     * @param eigens {[number]} Selected eigenpairs indexes
     * @returns {Object} a calculated PCA or null.
     */
    static calculateAreasSync(pca, eigens) {
        const pcaCalc = new Calculator();
        return pcaCalc.calculateAreas(pca, eigens);
    }
}


/**
 * Provides methods for matrix manipulation.
 */
class MatrixUtil {

    /**
     * Creates centered matrix from the given matrix.
     * @param matrix non-centered matrix
     * @returns {Matrix}
     */
    static center(matrix) {
        let centerMatrix = new Matrix(matrix);

        const means = mean(matrix);
        centerMatrix.subRowVector(means);

        return centerMatrix;
    }
}


/**
 * Calculates PCA
 */
class Calculator {

    /**
     * Calculates PCA from given datasets
     * @param datasets Datasets with entries
     * @returns {Object}
     */
    calculatePca(datasets) {
        const usedEntryValues = [];
        const usedEntryIds = [];
        const datasetStartIndexes = [];

        let datasetEntries, entry;
        for (let i = 0; i < datasets.length; i++) {
            datasetEntries = datasets[i].entries;
            datasetStartIndexes.push(usedEntryValues.length);

            for (let j = 0; j < datasetEntries.length; j++) {
                entry = datasetEntries[j];
                if (entry) {
                    usedEntryValues.push(entry.value);
                    usedEntryIds.push(entry.id);
                }
            }
        }

        if (usedEntryValues.length > 0) {
            const M = new Matrix(usedEntryValues);

            const M_center = MatrixUtil.center(M);

            const R = M_center.transposeView().mmul(M_center).div(M.rows - 1);
            // console.log('R:', R.rows, ':');
            // console.log(R[0].slice(0, 10).join(' | '));
            // console.log(R[1].slice(0, 10).join(' | '));
            // console.log(R[2].slice(0, 10).join(' | '));

            const SVD = svd(R, {autoTranspose: true});
            const U = new Matrix(SVD.rightSingularVectors);
            // console.log('U:', U.rows, ':', U.map(u => u.slice(0, 2)));
            // console.log(U[0].slice(0, 5).join(' | '));
            // console.log(U[1].slice(0, 5).join(' | '));
            // console.log(U[2].slice(0, 5).join(' | '));

            const S = SVD.diagonal;
            // console.log('S:', S.length, ':');
            // console.log(S.slice(0, 5).join(' | '));

            const C = M.mmul(U);
            // console.log('C:', C.length);
            // for (let i = 0; i < 5; i++) {
            //     console.log(C[i].slice(0, 5).join(' | '));
            // }

            const data = [];
            for (let i = 0; i < datasets.length; i++) {
                const dataset = datasets[i];

                const startIndex = datasetStartIndexes[i];
                const endIndex = (datasetStartIndexes.length >= i + 1) ? datasetStartIndexes[i + 1] : undefined;

                data.push({
                    id: dataset.id,
                    name: dataset.name,
                    color: dataset.color,
                    values: C.slice(startIndex, endIndex),
                    entryIds: usedEntryIds.slice(startIndex, endIndex)
                });
            }

            return {
                eigenvalues: S,
                eigenvectors: U.to2DArray(),
                cumulativeVariance: this._getCumulativeVariance(S),
                data: data
            };
        } else {
            return null;
        }
    }

    calculateAreas(pca, eigens) {
        if (pca === null) {
            return null;
        }

        const areas = [];
        const { data } = pca;
        for (let i = 0; i < data.length; i++) {
            const d = data[i];
            if (d.additional === true) {
                continue;
            }

            let area;
            if (eigens.length === 2) {
                area = this._calculateArea2D(d.values, eigens[0], eigens[1]);
            } else {
                area = this._calculateArea2D(d.values, eigens[0], eigens[1]);
            }
            // console.log('area:', area);
            areas.push(area);
        }

        return areas;
    }

    /**
     * Returns the proportion of variance for each component
     * @return {[number]}
     */
    _getExplainedVariance(eigenvalues) {
        var sum = 0;
        for (var i = 0; i < eigenvalues.length; i++) {
            sum += eigenvalues[i];
        }
        return eigenvalues.map(value => value / sum);
    }

    /**
     * Returns the cumulative proportion of variance
     * @return {[number]}
     */
    _getCumulativeVariance(eigenvalues) {
        var explained = this._getExplainedVariance(eigenvalues);
        for (var i = 1; i < explained.length; i++) {
            explained[i] += explained[i - 1];
        }
        return explained;
    }

    _linSpace(start, end, count) {
        const result = [];

        let current = start;
        const diff = (end - start) / (count - 1);
        for (let i = 0; i < count; i++) {
            result.push(current);
            current = current + diff;
        }

        return result;
    }

    _calculateArea2D(values, xIndex, yIndex) {
        const Ci = new Matrix(values.map(v => [v[xIndex], v[yIndex]]));

        const mi = mean(Ci);
        const Ci_center = MatrixUtil.center(Ci);
        const Ri = Ci_center.transposeView().mmul(Ci_center).div(Ci.rows - 1);
        // console.log('Ri', Ri);

        const SVDi = svd(Ri, {autoTranspose: true});
        const Ui = new Matrix(SVDi.rightSingularVectors);
        // console.log('Ui', Ui);
        const Si = Matrix.diag(SVDi.diagonal);
        // console.log('Si', Si);

        const t = this._linSpace(0, 2 * Math.PI, Ci.rows);
        const e = Matrix.zeros(t.length, 2);
        for (let i = 0; i < t.length; i++) {
            e.set(i, 0, Math.cos(t[i]));
            e.set(i, 1, Math.sin(t[i]));
        }
        // console.log('t', t.length);
        // console.log(t);
        // console.log('e', e.length);
        // console.log(e);

        const k1 = 3; // FIXME : optimalne je 3
        const k2 = 3; // FIXME : optimalne je 3
        const K = new Matrix([
            [k1, 0],
            [0, k2]
        ]);

        const Si_sqrt = new Matrix(Si);
        Si_sqrt.apply(function(r, c) {
            const s = this.get(r, c);
            const sqrtS = Math.sqrt(s);
            this.set(r, c, sqrtS);
        });
        // console.log('Si_sqrt', Si_sqrt);

        const Wi = Ui.mmul(K.mmul(Si_sqrt));
        // console.log('Wi', Wi);

        const ellipse = Wi.mmul(e.transpose()).transpose();
        // console.log('Wie', ellipse);
        for (let i = 0; i < ellipse.rows; i++) {
            ellipse.set(i, 0, ellipse.get(i, 0) + mi[0]);
            ellipse.set(i, 1, ellipse.get(i, 1) + mi[1]);
        }
        // console.log('ellipse', ellipse);

        return {
            mean: mi,
            ellipse: ellipse.to2DArray()
        };
    }
}


module.exports = CalculationUtil;
