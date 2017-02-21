"use strict";


const { baseStreamId, transformedStreamId } = require('../reducer/ProjectReducer');


/**
 * Project diirectory path
 * @param state {Object}
 * @returns {string}
 */
const getPath = (state) => state.project.path;

/**
 * Current version of calculated PCA
 * @param state {Object}
 * @returns {number}
 */
const getResultsVersion = (state) => state.project.resultsVersion;

/**
 * ID of currently shown dataset
 * @param state {Object}
 * @returns {number}
 */
const getDetailDatasetId = (state) => state.project.detailDatasetId;

/**
 * All entry IDs for currently shown dataset
 * @param state {Object}
 * @returns {Array}
 */
const getDetailEntryIds = (state) => (state.project.detailEntryIds !== null) ? state.project.detailEntryIds : [];

/**
 * Dataset for given ID
 * @param state {Object}
 * @param datasetId {number}
 * @returns {Object}
 */
const getDataset = (state, datasetId) => state.project.datasets[datasetId];

/**
 * Max ID used for an entry
 * @param state {Object}
 * @returns {number}
 */
const getLastEntryId = (state) => state.project.lastEntryId;

/**
 * All entries for dataset with given ID
 * @param state {Object}
 * @param datasetId {number}
 * @returns {Array}
 */
const getDatasetEntries = (state, datasetId) => {
    let entries = [];

    const entryMap = state.project.entries;
    const entryIds = Object.keys(entryMap);
    let entry;
    for (let i = 0; i < entryIds.length; i++) {
        entry = entryMap[entryIds[i]];
        if (entry && entry.datasetId === datasetId) {
            entries.push(entry);
        }
    }

    return entries;
};

/**
 * Original stream for dataset with given ID
 * @param state {Object}
 * @param datasetId {number}
 * @returns {Array}
 */
const getDatasetStream = (state, datasetId) => {
    const stream = state.project.streams[baseStreamId(datasetId)];
    return stream ? stream : [];
};

/**
 * Transformed stream for dataset with given ID
 * @param state {Object}
 * @param datasetId {number}
 * @returns {Array}
 */
const getDatasetTransformedStream = (state, datasetId) => {
    const stream = state.project.streams[transformedStreamId(datasetId)];
    return stream ? stream : [];
};

/**
 * All dataset IDs that should be used for PCA calculation
 * @param state {Object}
 * @returns {Array}
 */
const getIncludedDatasetIds = (state) => state.project.usedDatasetIds;

/**
 * <code>true</code> if dataset with given ID should be included in PCA calculation
 * @param state {Object}
 * @param datasetId {number}
 * @returns {bool}
 */
const isDatasetIncluded = (state, datasetId) => getIncludedDatasetIds(state).indexOf(datasetId) >= 0;

/**
 * All datasets
 * @param state {Object}
 * @returns {Array}
 */
const getAllDatasets = (state) => Object.keys(state.project.datasets)
                                        .map(id => state.project.datasets[id])
                                        .filter(d => d !== undefined && d !== null);

/**
 * All entries that should be used for PCA calculation
 * @param state {Object}
 * @returns {Array}
 */
const getIncludedDatasetsWithEntries = (state) => {
    const includedDatasetIds = getIncludedDatasetIds(state);
    const includedDatasets = includedDatasetIds.map(id => Object.assign({entries: []}, getDataset(state, id))); // make modifiable copy
    const { entries } = state.project;

    let entry, index;
    for (let id in entries) {
        if (!entries.hasOwnProperty(id)) continue;

        entry = entries[id];
        index = includedDatasetIds.indexOf(entry.datasetId);
        if (index >= 0) {
            includedDatasets[index].entries.push(entry);
        }
    }

    return includedDatasets;
};


module.exports = {
    getPath,
    getDataset,
    getDatasetEntries,
    getDatasetStream,
    getDatasetTransformedStream,
    getDetailDatasetId,
    getDetailEntryIds,
    getLastEntryId,
    getIncludedDatasetIds,
    getIncludedDatasetsWithEntries,
    isDatasetIncluded,
    getAllDatasets,
    getResultsVersion,
};
