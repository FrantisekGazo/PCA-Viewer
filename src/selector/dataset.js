"use strict";

const { createSelector } = require('reselect');

const getDataset = (state, props) => state.project.datasets[props.datasetId];

const getDetailDataset = (state) => getDataset(state, {datasetId: state.project.detail});

const getDatasetEntries = (state, props) => {
    const dataset = getDataset(state, props);
    return dataset.entries.map(entryId => state.project.entries[entryId])
        .map(entry => {
            if (entry.color) {
                return entry;
            } else {
                return Object.assign({}, entry, {color: dataset.color});
            }
        });
};

const getDetailDatasetEntries = (state) => {
    return getDatasetEntries(state, {datasetId: state.project.detail});
};

module.exports = {
    getDataset,
    getDatasetEntries,
    getDetailDataset,
    getDetailDatasetEntries,
};
