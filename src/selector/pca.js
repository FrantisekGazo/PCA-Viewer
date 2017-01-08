"use strict";

const { createSelector } = require('reselect');
const PCA = require('ml-pca');
const Matrix = require('ml-matrix');


const getOriginalMatrix = (state) => {
    const values = [];

    const datasets = state.project.usedDatasetIds.map(datasetId => state.project.datasets[datasetId]);

    for (let i = 0; i < datasets.length; i++) {
        const entryIds = datasets[i].entries;
        for (let j = 0; j < entryIds.length; j++) {
            const entryId = entryIds[j];
            const entry = state.project.entries[entryId];
            values.push(entry.value);
        }
    }

    if (values) {
        const matrix = new Matrix(values.length, values[0].length);
        for (let r = 0; r < values.length; r++) {
            matrix.setRow(r, values[r]);
        }
        return matrix;
    } else {
        return new Matrix(0, 0);
    }
};

const getPCA = createSelector(
    [getOriginalMatrix],
    (matrix) => {
        if (matrix.length >= 0) {
            return new PCA(matrix, {
                scale: true,
                useCovarianceMatrix: true
            });
        } else {
            return null;
        }
    }
);

const getUsedEigenpairs = (state) => state.project.usedEigenpairs;

const getProjectionMatrix = createSelector(
    [getPCA, getUsedEigenpairs],
    (pca, eigenpairs = [0, 1]) => { // TODO : make eigenpair selector
        if (pca) {
            const eigenvalues = pca.getEigenvalues();
            const eigenvectors = pca.getEigenvectors();

            const matrix = new Matrix(eigenvectors.length, eigenpairs.length);

            for (let r = 0; r < eigenvectors.length; r++) {
                for (let c = 0; c < eigenvalues.length; c++) {
                    const index = eigenpairs.indexOf(c);
                    if (index > -1) {
                        matrix.set(r, index, eigenvectors[r][c]);
                    }
                }
            }

            return matrix;
        } else {
            return null;
        }
    }
);

const getTransformedMatrix = createSelector(
    [getOriginalMatrix, getProjectionMatrix],
    (originalMatrix, projectionMatrix) => {
        if (originalMatrix && projectionMatrix) {
            return originalMatrix.mmul(projectionMatrix);
        } else {
            return null;
        }
    }
);

const getTransformedEntries = (state) => {
    const m = getPCA(state);

    const transformedMatrix = getTransformedMatrix(state);

    if (transformedMatrix) {
        const datasets = state.project.usedDatasetIds.map(datasetId => state.project.datasets[datasetId]);

        const transformedEntries = [];
        let row = 0;

        for (let i = 0; i < datasets.length; i++) {
            const entryIds = datasets[i].entries;
            for (let j = 0; j < entryIds.length; j++) {
                const entryId = entryIds[j];
                const entry = state.project.entries[entryId];

                const transformedEntry = Object.assign({}, entry, {
                    value: transformedMatrix.getRow(row)
                });

                transformedEntries.push(transformedEntry);
                row += 1;
            }
        }

        return transformedEntries;
    } else {
        return [];
    }
};
/*
const getTransformedEntries = createSelector(
    [getTransformedMatrix],
    (transformedMatrix) => {
        if (transformedMatrix) {
            const datasets = state.project.usedDatasetIds.map(datasetId => state.project.datasets[datasetId]);

            const transformedEntries = [];
            let row = 0;

            for (let i = 0; i < datasets.length; i++) {
                const entryIds = datasets[i].entries;
                for (let j = 0; j < entryIds.length; j++) {
                    const entryId = entryIds[j];
                    const entry = state.project.entries[entryId];

                    const transformedEntry = Object.assign({}, entry, {
                        value: transformedMatrix.getRow(row)
                    });

                    transformedEntries.push(transformedEntry);
                    row += 1;
                }
            }

            return transformedEntries;
        } else {
            return [];
        }
    }
);
*/

module.exports = {
    getPCA,
    getProjectionMatrix,
    getTransformedMatrix,
    getTransformedEntries,
};
