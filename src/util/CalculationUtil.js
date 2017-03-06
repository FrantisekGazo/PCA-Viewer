"use strict";

const PCA = require('ml-pca');
const Matrix = require('ml-matrix');

const { WorkerTaskNames, WorkerUtil } = require('./WorkerUtil');
const CmdUtil = require('./CmdUtil');


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
        const usedEntryValues = [];
        let datasetEntries, entry;
        for (let i = 0; i < datasets.length; i++) {
            datasetEntries = datasets[i].entries;

            for (let j = 0; j < datasetEntries.length; j++) {
                entry = datasetEntries[j];
                if (entry) {
                    usedEntryValues.push(entry.value);
                }
            }
        }

        CmdUtil.executePcaScript(usedEntryValues)
            .then((out) => {
                console.log(out);
            })
            .catch((err) => {
                console.error(err);
            });

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

            const data = [];
            for (let i = 0; i < this.datasets.length; i++) {
                const dataset = this.datasets[i];

                const startIndex = datasetStartIndexes[i];
                const endIndex = (datasetStartIndexes.length >= i + 1) ? datasetStartIndexes[i + 1] : undefined;

                data.push({
                    id: dataset.id,
                    name: dataset.name,
                    color: dataset.color,
                    values: transformedMatrix.slice(startIndex, endIndex),
                    entryIds: usedEntryIds.slice(startIndex, endIndex)
                });

                const values = usedEntryValues.slice(startIndex, endIndex);
                this._calculateArea(values);
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

    _calculateArea(values) {
        const matrix = new Matrix(values);
        const pca = this._calculatePca(matrix);

        console.log('_calculateArea:', values, pca);
    }

    _calculatePca(matrix) {
        return new PCA(matrix, {
            scale: false,
            center: false
        });
    }
}


module.exports = CalculationUtil;
