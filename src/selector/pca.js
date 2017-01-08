"use strict";

const { createSelector } = require('reselect');
const PCA = require('ml-pca');
const Matrix = require('ml-matrix');

const { getDatasetEntries } = require('./dataset');


const getUsedEntries = (state) => {
    return state.project.usedDatasetIds
        .map((datasetId) => getDatasetEntries(state, {datasetId: datasetId}))
        .reduce((result, entries) => result.concat(entries), []);
};

const getOriginalMatrix = (state) => {
    const values = getUsedEntries(state).map(entry => entry.value);

    if (values.length > 0) {
        return new Matrix(values);
    } else {
        return null;
    }
};

const getPCA = createSelector(
    [getOriginalMatrix],
    (matrix) => {
        if (matrix) {
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
