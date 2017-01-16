"use strict";


const isDetailShown = (state, props) => state.project.detail !== null;

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

const getUsedEntries = (state) => {
    return state.project.usedDatasetIds
        .map((datasetId) => getDatasetEntries(state, {datasetId: datasetId}))
        .reduce((result, entries) => result.concat(entries), []);
};

module.exports = {
    getDataset,
    getDatasetEntries,
    getDetailDataset,
    getDetailDatasetEntries,
    getUsedEntries,
    isDetailShown,
};
