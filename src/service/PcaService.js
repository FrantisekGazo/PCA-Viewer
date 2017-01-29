"use strict";

const PCA = require('ml-pca');
const Matrix = require('ml-matrix');


/**
 * Calculates PCA.
 * @param datasets All datasets
 * @param entriesMap Map of all entries
 * @returns {Promise} that will resolve with a calculated PCA or reject with an error.
 */
function calculatePCA(datasets, entriesMap) {
    return new Promise(function (resolve, reject) {
        const usedEntryValues = [];
        const datasetStartIndexes = [];

        let datasetEntryIds, entryId, entry;
        for (let i = 0; i < datasets.length; i++) {
            datasetEntryIds = datasets[i].entries;
            datasetStartIndexes.push(usedEntryValues.length);

            for (let j = 0; j < datasetEntryIds.length; j++) {
                entryId = datasetEntryIds[j];
                entry = entriesMap[entryId];
                if (entry) {
                    usedEntryValues.push(entry.value);
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
                    values: transformedMatrix.slice(startIndex, endIndex)
                });
            }

            resolve({
                eigenvalues: pca.getEigenvalues(),
                eigenvectors: pca.getEigenvectors(),
                cumulativeVariance: pca.getCumulativeVariance(),
                data: data
            });
        } else {
            return null;
        }
    });
}


module.exports = {
    calculatePCA,
};
