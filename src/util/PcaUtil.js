"use strict";

const PCA = require('ml-pca');
const Matrix = require('ml-matrix');

const WorkerUtil = require('./WorkerUtil');

/**
 * Asynchronously calculates PCA.
 * @param datasets {Array} All datasets with entries
 * @returns {Promise} that will resolve with a calculated PCA or null.
 */
function calculatePcaAsync(datasets) {
    return WorkerUtil.execByWorker(WorkerUtil.WorkerTasks.CALCULATE_PCA, datasets);
}

/**
 * Synchronously calculates PCA. This should be called only by a worker process!
 * @param datasets {Array} All datasets with entries
 * @returns {Object} a calculated PCA or null.
 */
function calculatePcaSync(datasets) {
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
        const originalMatrix = new Matrix(usedEntryValues);
        const pca = new PCA(originalMatrix, {
            scale: true
        });
        const transformedMatrix = pca.predict(originalMatrix);

        const data = [];
        for (let i = 0; i < datasets.length; i++) {
            const dataset = datasets[i];

            const startIndex = datasetStartIndexes[i];
            const endIndex = (datasetStartIndexes.length >= i + 1) ? datasetStartIndexes[i + 1] : undefined;

            data.push({
                id: dataset.id,
                name: dataset.name,
                color: dataset.color,
                values: transformedMatrix.slice(startIndex, endIndex),
                entryIds: usedEntryIds.slice(startIndex, endIndex)
            });
        }

        return {
            eigenvalues: pca.getEigenvalues(),
            eigenvectors: pca.getEigenvectors(),
            cumulativeVariance: pca.getCumulativeVariance(),
            data: data
        };
    } else {
        return null;
    }
}


module.exports = {
    calculatePcaSync,
    calculatePcaAsync,
};
