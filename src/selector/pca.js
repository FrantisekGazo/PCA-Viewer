"use strict";

const { createSelector } = require('reselect');
const PCA = require('ml-pca');


const getAllUsedEntries = (state) => {
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

    return values;
};

const getPCA = createSelector(
    [getAllUsedEntries],
    (values) => {
        if (values.length > 0) {
            const pca = new PCA(values, {
                scale: true
            });
            return JSON.stringify(pca.toJSON());
        } else {
            return "";
        }
    }
);


module.exports = {
    getPCA,
};
