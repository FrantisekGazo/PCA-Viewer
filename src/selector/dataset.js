"use strict";


const getDetailId = (state, props) => state.project.detail;

const getDataset = (state, props) => state.project.datasets[props.datasetId];

const getDetailDataset = (state) => getDataset(state, {datasetId: state.project.detail});

const getLastEntryId = (state) => state.project.lastEntryId;

const getDatasetEntries = (state, props) => {
    const dataset = getDataset(state, props);
    return dataset.entries.map(entryId => state.project.entries[entryId]);
};

const getDatasetEntriesColored = (state, props) => {
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

const getUsedEntriesColored = (state) => {
    return state.project.usedDatasetIds
        .map((datasetId) => getDatasetEntriesColored(state, {datasetId: datasetId}))
        .reduce((result, entries) => result.concat(entries), []);
};

const getAllDatasets = (state) => state.project.usedDatasetIds.map(id => state.project.datasets[id]);

const getAllEntriesMap = (state) => state.project.entries;


module.exports = {
    getDataset,
    getDatasetEntries,
    getDatasetEntriesColored,
    getDetailDataset,
    getDetailDatasetEntries,
    getDetailId,
    getLastEntryId,
    getUsedEntriesColored,
    getAllDatasets,
    getAllEntriesMap,
};
