"use strict";

const { createSelector } = require('reselect');
const PCA = require('ml-pca');
const Matrix = require('ml-matrix');


const getUsedEntries = (state) => {
    return state.project.usedDatasetIds
        .map((datasetId) => state.project.datasets[datasetId])
        .reduce((result, dataset) => result.concat(dataset.entries), [])
        .map(entryId => state.project.entries[entryId]);
};

const getOriginalMatrix = (state) => {
    const values = getUsedEntries(state).map(entry => entry.value);

    if (values) {
        return new Matrix(values);
    } else {
        return new Matrix(0, 0);
    }
};

const getPCA = createSelector(
    [getOriginalMatrix],
    (matrix) => {
        if (matrix.length >= 0) {
            return new PCA(matrix, {
                scale: true
            });
        } else {
            return null;
        }
    }
);

const getTransformedMatrix = createSelector(
    [getOriginalMatrix, getPCA],
    (originalMatrix, pca) => {
        if (originalMatrix && pca) {
            return pca.predict(originalMatrix);
        } else {
            return null;
        }
    }
);

const getTransformedEntries = createSelector(
    [getTransformedMatrix, getUsedEntries],
    (transformedMatrix, usedEntries) => {
        if (transformedMatrix && usedEntries) {
            let i = 0;
            return usedEntries.map(entry => {
                const row = transformedMatrix.getRow(i);
                i += 1;

                return Object.assign({}, entry, {
                    value: row
                });
            });
        } else {
            return [];
        }
    }
);


module.exports = {
    getPCA,
    getTransformedEntries,
};
