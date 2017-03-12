"use strict";

const update = require('immutability-helper');

const { ACTIONS } = require('../../action/ProjectActionCreator');
const Dataset = require('../model/Dataset');
const { sortNumArrayDesc } = require('../../util');
const { DEFAULT_SAMPLING_WINDOW_SIZE, PROJECT_TYPE, TRANSFORMATIONS } = require('../Constants');


// HELPER FUNCTIONS ----------------------------------------------------------------------

/**
 * Builds ID for original dataset stream
 * @param datasetId Dataset ID
 * @returns {string} Stream ID
 */
function baseStreamId(datasetId) {
    return `${datasetId}_base`;
}

/**
 * Builds ID for transformed dataset stream
 * @param datasetId Dataset ID
 * @returns {string} Stream ID
 */
function transformedStreamId(datasetId) {
    return `${datasetId}_used`;
}

// REDUCER FUNCTIONS ----------------------------------------------------------------------

/**
 * Sets the project state.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: Object}} Received action with new state
 * @returns {Object} New state
 */
function setProject(state, action) {
    const projectState = action.payload;

    let newState;
    if (projectState) {
        if (projectState.samplingWindow) {
            newState = Object.assign({}, initState, projectState);
        } else {
            const { name, path, type, sampling, hasConstantSampling } = projectState;
            newState = update(initState, {
                name: {$set: name},
                path: {$set: path},
                type: {$set: type},
                samplingWindow: {
                    $merge: {
                        size: sampling,
                        isConstant: hasConstantSampling,
                    }
                }
            });
        }
    } else {
        newState = initState;
    }

    if (newState.type === PROJECT_TYPE.ONLINE_PCA) {
        if (newState.datasets[1]) {
            newState.detailDatasetId = 1;
        } else {
            newState = addNewDataset(newState);
        }
    }

    return newState;
}

/**
 * Closes the project.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: undefined}} Received action without a payload
 * @returns {Object} New state
 */
function closeProject(state, action) {
    return initState;
}

/**
 * Shows an error in the project.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: string}} Received action with error message
 * @returns {Object} New state
 */
function showProjectError(state, action) {
    return update(state, {
        error: {$set: action.payload}
    });
}

/**
 * Adds a new dataset.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: undefined}} Received action without a payload
 * @returns {Object} New state
 */
function addNewDataset(state, action) {
    const datasetId = state.lastDatasetId + 1;

    return update(state, {
        datasets: {
            [datasetId]: {$set: new Dataset({id: datasetId})}
        },
        usedDatasetIds: {$push: [datasetId]},
        lastDatasetId: {$set: datasetId},
        detailDatasetId: {$set: datasetId}
    });
}

/**
 * Updates a dataset.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: Object}} Received action with the changes
 * @returns {Object} New state
 */
function updateDataset(state, action) {
    const { datasetId, changes } = action.payload;
    const { dataset, included, entries, stream, transformedStream } = changes;

    // prepare list of all dataset IDs included in PCA
    let newUsedDatasetIds = state.usedDatasetIds;
    const index = state.usedDatasetIds.indexOf(datasetId);
    const currentlyIncluded = index >= 0;
    if (included !== currentlyIncluded) {
        newUsedDatasetIds = [].concat(state.usedDatasetIds);
        if (included) {
            newUsedDatasetIds.push(datasetId);
        } else {
            newUsedDatasetIds.splice(index, 1);
        }
    }

    if (entries) {
        // find max ID used
        let maxId = 0;
        if (entries.length > 0) {
            const entryIds = entries.map(entry => entry.id);
            maxId = sortNumArrayDesc(entryIds)[0];
        }
        if (state.lastEntryId > maxId) {
            maxId = state.lastEntryId;
        }
        // prepare entry map
        const entryMap = Object.assign({}, state.entries);
        let entry;
        for (let i = 0; i < entries.length; i++) {
            entry = entries[i];
            entryMap[entry.id] = entry;
        }

        return update(state, {
            datasets: {
                [datasetId]: {$set: dataset}
            },
            entries: {$set: entryMap},
            lastEntryId: {$set: maxId},
            usedDatasetIds: {$set: newUsedDatasetIds},
            version: {$set: state.version + 1}
        });
    } else {
        // prepare stream IDs
        const bsid = baseStreamId(datasetId);
        const tsid = transformedStreamId(datasetId);

        return update(state, {
            datasets: {
                [datasetId]: {$set: dataset}
            },
            streams: {
                [bsid]: {$set: stream},
                [tsid]: {$set: transformedStream}
            },
            usedDatasetIds: {$set: newUsedDatasetIds},
            version: {$set: state.version + 1}
        });
    }
}

/**
 * Deletes a dataset.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: number}} Received action with the dataset ID
 * @returns {Object} New state
 */
function deleteDataset(state, action) {
    const datasetId = action.payload;

    let hasEntries = false;
    let entryMap = Object.assign({}, state.entries);
    let entry;
    for (let id in entryMap) {
        if (!entryMap.hasOwnProperty(id)) continue;

        entry = entryMap[id];
        if (entry && entry.datasetId !== datasetId) continue; // leave it there

        delete entryMap[id];
        hasEntries = true;
    }
    const version = (hasEntries) ? state.version + 1 : state.version;

    const bsid = baseStreamId(datasetId);
    const tsid = transformedStreamId(datasetId);
    return update(state, {
        usedDatasetIds: {
            $set: state.usedDatasetIds.filter(id => id !== datasetId)
        },
        datasets: {
            [datasetId]: {$set: undefined}
        },
        entries: {$set: entryMap},
        streams: {
            [bsid]: {$set: undefined},
            [tsid]: {$set: undefined}
        },
        detailDatasetId: {$set: null},
        version: {$set: version}
    });
}

/**
 * Shows a dataset detail.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: number}} Received action with the dataset ID
 * @returns {Object} New state
 */
function showDatasetDetail(state, action) {
    return update(state, {
        detailDatasetId: {$set: action.payload}
    });
}

/**
 * Closes a dataset.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: undefined}} Received action without a payload
 * @returns {Object} New state
 */
function closeDatasetDetail(state, action) {
    return update(state, {
        detailDatasetId: {$set: null}
    });
}

/**
 * Sets new selected entries.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: Array}} Received action with selected entry IDs
 * @returns {Object} New state
 */
function selectEntries(state, action) {
    const entryIds = action.payload;

    return update(state, {
        selectedEntryIds: {$set: entryIds}
    });
}

/**
 * Deletes entries.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: Array}} Received action with entry IDs
 * @returns {Object} New state
 */
function deleteEntries(state, action) {
    const entryIds = action.payload;

    let newEntries = Object.assign({}, state.entries);
    const newSelectedIds = state.selectedEntryIds.slice();

    let entryId;
    for (let i = 0; i < entryIds.length; i++) {
        entryId = entryIds[i];
        // delete the entry
        delete newEntries[entryId];

        // delete entry ID from selected IDs
        const index = newSelectedIds.indexOf(entryId);
        newSelectedIds.splice(index, 1);
    }

    return update(state, {
        entries: {$set: newEntries},
        selectedEntryIds: {$set: newSelectedIds},
        version: {$set: state.version + 1}
    });
}

/**
 * Sets new sampling window.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: Object}} Received action with sampling window
 * @returns {Object} New state
 */
function setSampling(state, action) {
    const samplingWindow = action.payload;

    return update(state, {
        samplingWindow: {$set: samplingWindow},
        selectedEntryIds: {$set: []}
    });
}


/**
 * Sets sampled entries.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: Object}} Received action with sampled entries
 * @returns {Object} New state
 */
function setSampledEntries(state, action) {
    return update(state, {
        entries: {$set: action.payload},
        version: {$set: state.version + 1}
    });
}

/**
 * Initial state of this project reducer
 */
const initState = {
    /* path to the project directory */
    path: null,
    /* project name */
    name: '',
    /* project type */
    type: PROJECT_TYPE.OFFLINE_PCA,

    /* project sampling */
    samplingWindow: {
        isConstant: false,
        size: DEFAULT_SAMPLING_WINDOW_SIZE,
        overlay: 0,
        start: 0,
        fixedCount: 10,
    },

    /* error */
    error: '',

    /* dataset IDs used by project */
    usedDatasetIds: [],
    /* all datasets */
    lastDatasetId: 0,
    datasets: {},
    /* all entries */
    lastEntryId: 0,
    entries: {},
    /* all streams */
    streams: {},

    /* show detail for dataset */
    detailDatasetId: null,
    selectedEntryIds: null,

    /* this needs to be incremented if calculation needs to be run */
    version: 0,
};


/**
 * Updates project state based on received action.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: *}} Received action
 * @returns {Object} New state
 */
function project(state = initState, action) {
    switch (action.type) {
        case ACTIONS.SET_PROJECT:
            return setProject(state, action);
        case ACTIONS.CLOSE_PROJECT:
            return closeProject(state, action);
        case ACTIONS.SHOW_PROJECT_ERROR:
            return showProjectError(state, action);
        case ACTIONS.NEW_DATASET:
            return addNewDataset(state, action);
        case ACTIONS.UPDATE_DATASET:
            return updateDataset(state, action);
        case ACTIONS.DELETE_DATASET:
            return deleteDataset(state, action);
        case ACTIONS.SHOW_DATASET_DETAIL:
            return showDatasetDetail(state, action);
        case ACTIONS.CLOSE_DATASET_DETAIL:
            return closeDatasetDetail(state, action);
        case ACTIONS.SELECT_ENTRIES:
            return selectEntries(state, action);
        case ACTIONS.DELETE_ENTRIES:
            return deleteEntries(state, action);
        case ACTIONS.SET_SAMPLING:
            return setSampling(state, action);
        case ACTIONS.SET_SAMPLED_ENTRIES:
            return setSampledEntries(state, action);
        default:
            return state;
    }
}

module.exports = {
    project,
    baseStreamId,
    transformedStreamId,
};
