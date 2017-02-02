"use strict";


const { baseStreamId, transformedStreamId } = require('../reducer/project');


const getDetailDatasetId = (state) => state.project.detailDatasetId;

const getDetailEntryIds = (state) => (state.project.detailEntryIds !== null) ? state.project.detailEntryIds : [];

const getDataset = (state, datasetId) => state.project.datasets[datasetId];

const getLastEntryId = (state) => state.project.lastEntryId;

const getDatasetEntries = (state, datasetId) => {
    const dataset = getDataset(state, datasetId);
    return dataset.entries.map(entryId => state.project.entries[entryId]);
};

const getDatasetEntriesColored = (state, datasetId) => {
    const dataset = getDataset(state, datasetId);
    return dataset.entries.map(entryId => state.project.entries[entryId])
        .map(entry => {
            if (entry.color) {
                return entry;
            } else {
                return Object.assign({}, entry, {color: dataset.color});
            }
        });
};

const getDatasetStream = (state, datasetId) => {
    const stream = state.project.streams[baseStreamId(datasetId)];
    return stream ? stream : [];
};

const getDatasetTransformedStream = (state, datasetId) => {
    const stream = state.project.streams[transformedStreamId(datasetId)];
    return stream ? stream : [];
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
    getDatasetStream,
    getDatasetTransformedStream,
    getDetailDatasetId,
    getDetailEntryIds,
    getLastEntryId,
    getUsedEntriesColored,
    getAllDatasets,
    getAllEntriesMap,
};
