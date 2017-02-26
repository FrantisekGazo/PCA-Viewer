"use strict";


const { baseStreamId, transformedStreamId } = require('../reducer/ProjectReducer');


/**
 * Returns project part of the state.
 * @param state {Object}
 * @returns {Object}
 */
const getProjectState = (state) => state.project;

/**
 * Returns project directory path.
 * @param state {Object}
 * @returns {string}
 */
const getPath = (state) => getProjectState(state).path;

/**
 * Returns project name.
 * @param state {Object}
 * @returns {string}
 */
const getName = (state) => getProjectState(state).name;

/**
 * Returns the sampling window information.
 * @param state {Object}
 * @returns {Object}
 */
const getSamplingWindow = (state) => getProjectState(state).samplingWindow;

/**
 * Returns current version of the project data.
 * @param state {Object}
 * @returns {number}
 */
const getVersion = (state) => getProjectState(state).version;

/**
 * Returns ID of currently shown dataset.
 * @param state {Object}
 * @returns {number}
 */
const getDetailDatasetId = (state) => getProjectState(state).detailDatasetId;

/**
 * Returns dataset for given ID.
 * @param state {Object}
 * @param datasetId {number}
 * @returns {Object}
 */
const getDataset = (state, datasetId) => getProjectState(state).datasets[datasetId];

/**
 * Returns max ID used for an entry.
 * @param state {Object}
 * @returns {number}
 */
const getLastEntryId = (state) => getProjectState(state).lastEntryId;

/**
 * Returns all entries for dataset with given ID.
 * @param state {Object}
 * @param datasetId {number}
 * @returns {Array}
 */
const getDatasetEntries = (state, datasetId) => {
    let entries = [];

    const entryMap = getProjectState(state).entries;
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
 * Returns original stream for dataset with given ID.
 * @param state {Object}
 * @param datasetId {number}
 * @returns {Array}
 */
const getDatasetStream = (state, datasetId) => {
    const stream = getProjectState(state).streams[baseStreamId(datasetId)];
    return stream ? stream : [];
};

/**
 * Returns transformed stream for dataset with given ID.
 * @param state {Object}
 * @param datasetId {number}
 * @returns {Array}
 */
const getDatasetTransformedStream = (state, datasetId) => {
    const stream = getProjectState(state).streams[transformedStreamId(datasetId)];
    return stream ? stream : [];
};

/**
 * Returns all dataset IDs that should be used for PCA calculation.
 * @param state {Object}
 * @returns {Array}
 */
const getIncludedDatasetIds = (state) => getProjectState(state).usedDatasetIds;

/**
 * <code>true</code> if dataset with given ID should be included in PCA calculation
 * @param state {Object}
 * @param datasetId {number}
 * @returns {bool}
 */
const isDatasetIncluded = (state, datasetId) => getIncludedDatasetIds(state).indexOf(datasetId) >= 0;

/**
 * Returns all datasets.
 * @param state {Object}
 * @returns {Array}
 */
const getAllDatasets = (state) => Object.keys(getProjectState(state).datasets)
                                        .map(id => getProjectState(state).datasets[id])
                                        .filter(d => d !== undefined && d !== null);

/**
 * Returns all entries that should be used for PCA calculation.
 * @param state {Object}
 * @returns {Array}
 */
const getIncludedDatasetsWithEntries = (state) => {
    const includedDatasetIds = getIncludedDatasetIds(state);
    const includedDatasets = includedDatasetIds.map(id => Object.assign({entries: []}, getDataset(state, id))); // make modifiable copy
    const { entries } = getProjectState(state);

    let entry, index;
    for (let id in entries) {
        if (!entries.hasOwnProperty(id)) continue;

        entry = entries[id];
        index = includedDatasetIds.indexOf(entry.datasetId);
        if (index >= 0) {
            includedDatasets[index].entries.push(entry);
        }
    }

    const sortEntries = (a, b) => a.id - b.id;
    let dataset;
    for (let i = 0; i < includedDatasets.length; i++) {
        dataset = includedDatasets[i];
        dataset.entries = dataset.entries.sort(sortEntries);
    }

    return includedDatasets;
};

/**
 * Returns project type.
 * @param state {Object}
 * @returns {number}
 */
const getType = (state) => getProjectState(state).type;

/**
 * Returns all IDs for currently selected entries.
 * @param state {Object}
 * @returns {Array}
 */
const getSelectedEntryIds = (state) => {
    const ids = getProjectState(state).selectedEntryIds;
    return ids ? ids : [];
};

/**
 * Returns all selected entries.
 * @param state {Object}
 * @returns {Array}
 */
const getSelectedEntries = (state) => {
    const entryIds = getSelectedEntryIds(state);
    const projectState = getProjectState(state);
    return entryIds.map(id => projectState.entries[id]);
};


module.exports = {
    getPath,
    getName,
    getType,
    getSamplingWindow,
    getDataset,
    getDatasetEntries,
    getDatasetStream,
    getDatasetTransformedStream,
    getDetailDatasetId,
    getSelectedEntryIds,
    getLastEntryId,
    getIncludedDatasetIds,
    getIncludedDatasetsWithEntries,
    isDatasetIncluded,
    getAllDatasets,
    getVersion,
    getSelectedEntries,
};
