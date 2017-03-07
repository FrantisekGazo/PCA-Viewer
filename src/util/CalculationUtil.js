"use strict";

const PCA = require('ml-pca');
const Matrix = require('ml-matrix');

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
        const pcaCalc = new PcaCalculator(datasets);
        return pcaCalc.calculate();
    }
}


/**
 * Calculates PCA
 */
class PcaCalculator {

    constructor(datasets) {
        this.datasets = datasets;
    }

    /**
     * Calculates and returns PCA
     */
    calculate() {
        const usedEntryValues = [];
        const usedEntryIds = [];
        const datasetStartIndexes = [];

        let datasetEntries, entry;
        for (let i = 0; i < this.datasets.length; i++) {
            datasetEntries = this.datasets[i].entries;
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
            const originalMatrix = new Matrix(usedEntryValues);
            const pca = this._calculatePca(originalMatrix);
            const transformedMatrix = pca.predict(originalMatrix);
            console.log('pca:', pca);

            const data = [];
            for (let i = 0; i < this.datasets.length; i++) {
                const dataset = this.datasets[i];

                const startIndex = datasetStartIndexes[i];
                const endIndex = (datasetStartIndexes.length >= i + 1) ? datasetStartIndexes[i + 1] : undefined;

                const values = usedEntryValues.slice(startIndex, endIndex);
                const area = this._calculateArea(values, pca);

                data.push({
                    id: dataset.id,
                    name: dataset.name,
                    color: dataset.color,
                    values: transformedMatrix.slice(startIndex, endIndex),
                    entryIds: usedEntryIds.slice(startIndex, endIndex),
                    area: area
                });
            }

            return {
                b: pca.toJSON(),
                eigenvalues: pca.getEigenvalues(),
                eigenvectors: pca.getEigenvectors(),
                cumulativeVariance: pca.getCumulativeVariance(),
                data: data
            };
        } else {
            return null;
        }
    }

    _calculateArea(values, fullPca) {
        const matrix = new Matrix(values);
        const pca = this._calculatePca(matrix);

        console.log('_calculateArea', pca);

        const transformedMeans = fullPca.predict([pca.means]);

        // ADD 0 for missing dimensions - not correct approach
        // const dimen = fullPca.getEigenvectors().length;
        // let eigenvectors = pca.getEigenvectors().map(v => {
        //     let resV = [].concat(v);
        //     for (let i = resV.length; i < dimen; i++) {
        //         // resV.push(0);
        //     }
        //     return resV;
        // });
        // const transformedEigenvectors = fullPca.predict(eigenvectors.slice(0, 10));

        let eigenvectors = pca.getEigenvectors();
        const transformedEigenvectors = fullPca.predict(eigenvectors);

        return {
            mean: transformedMeans[0],
            eigenvalues: pca.getEigenvalues(),
            eigenvectors: eigenvectors,
            transformedEigenvectors: transformedEigenvectors,
        };
    }

    _calculatePca(matrix) {
        return new PCA(matrix, {
            scale: false,
            center: true
        });
    }
}


module.exports = CalculationUtil;
