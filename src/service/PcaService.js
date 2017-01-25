"use strict";

const PCA = require('ml-pca');
const Matrix = require('ml-matrix');

const { getUsedEntriesColored } = require('./../selector/dataset');


function getOriginalMatrix(usedEntries) {
    const values = usedEntries.map(entry => entry.value);

    if (values.length > 0) {
        return new Matrix(values);
    } else {
        return null;
    }
}

function getTransformedEntries(transformedMatrix, usedEntries) {
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

function calculatePCA(state) {
    const usedEntries = getUsedEntriesColored(state);

    if (usedEntries.length > 0) {
        const originalMatrix = getOriginalMatrix(usedEntries);
        const pca = new PCA(originalMatrix, {
            scale: true
        });
        const transformedMatrix = pca.predict(originalMatrix);

        return {
            eigenvalues: pca.getEigenvalues(),
            eigenvectors: pca.getEigenvectors(),
            cumulativeVariance: pca.getCumulativeVariance(),
            transformedEntries: getTransformedEntries(transformedMatrix, usedEntries),
        };
    } else {
        return null;
    }
}


module.exports = {
    calculatePCA,
};
