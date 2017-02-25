"use strict";

const update = require('immutability-helper');

const { ACTIONS } = require('../../action/ProjectAction');
const { sortNumArrayDesc } = require('../../util');
const { PROJECT_TYPE, TRANSFORMATIONS } = require('../Constants');


// HELPER FUNCTIONS ----------------------------------------------------------------------

/**
 * Creates Dataset structure.
 */
function newDataset(id) {
    return {
        id: id,
        name: `Dataset ${id}`,
        desc: '',
        color: '#000000',
        // stream info
        transformationType: TRANSFORMATIONS.NONE, // stream transformation type
        transformationValue: 0, // stream transformation value
    }
}

/**
 * Creates Entry structure.
 */
function newEntry(args) {
    if (args.id === undefined) {
        throw new Error("entry is missing an 'id'");
    }
    if (args.datasetId === undefined) {
        throw new Error("entry is missing a 'datasetId'");
    }

    return Object.assign({
        id: undefined,
        datasetId: undefined,
        name: `E${args.id}`,
        color: undefined,
        value: undefined,
        streamPosition: undefined
    }, args);
}

const baseStreamId = (datasetId) => `${datasetId}_base`;

const transformedStreamId = (datasetId) => `${datasetId}_used`;

// REDUCER FUNCTIONS ----------------------------------------------------------------------

function setProject(state, action) {
    const projectState = action.payload;

    let newState;
    if (projectState) {
        const { name, path, type, sampling, hasConstantSampling } = projectState;
        newState = update(initState, {
            name: {$set: name},
            path: {$set: path},
            type: {$set: type},
            samplingWindow: {
                size: {$set: sampling},
                isConstant: {$set: hasConstantSampling},
            }
        });
    } else {
        newState = initState;
    }

    if (newState.type === PROJECT_TYPE.ONLINE_PCA) {
        if (newState.detailDatasetId === null) {
            newState = addNewDataset(newState);
        }
    }

    return newState;
}

function closeProject(state, action) {
    return initState;
}

function showProjectError(state, action) {
    return update(state, {
        error: {$set: action.payload}
    });
}

function addNewDataset(state, action) {
    const datasetId = state.lastDatasetId + 1;

    return update(state, {
        datasets: {
            [datasetId]: {$set: newDataset(datasetId)}
        },
        usedDatasetIds: {$push: [datasetId]},
        lastDatasetId: {$set: datasetId},
        detailDatasetId: {$set: datasetId}
    });
}

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
    const resultsVersion = (hasEntries) ? state.resultsVersion + 1 : state.resultsVersion;

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
        resultsVersion: {$set: resultsVersion}
    });
}

function showDatasetDetail(state, action) {
    return update(state, {
        detailDatasetId: {$set: action.payload}
    });
}

function closeDatasetDetail(state, action) {
    return update(state, {
        detailDatasetId: {$set: null}
    });
}

function selectEntries(state, action) {
    const entryIds = action.payload;

    return update(state, {
        detailEntryIds: {$set: entryIds}
    });
}

function setSampling(state, action) {
    const samplingWindow = action.payload;

    return update(state, {
        samplingWindow: {$set: samplingWindow}
    });
}

function setSampledEntries(state, action) {
    return update(state, {
        entries: {$set: action.payload},
        version: {$set: state.version + 1}
    });
}

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
        size: null,
        start: 0,
        fixedCount: 10,
        additionalCount: 0,
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
    detailEntryIds: null,

    /* this needs to be incremented if calculation needs to be run */
    version: 0,
};
const project = (state = initState, action) => {
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
        case ACTIONS.SET_SAMPLING:
            return setSampling(state, action);
        case ACTIONS.SET_SAMPLED_ENTRIES:
            return setSampledEntries(state, action);
        default:
            return state;
    }
};

module.exports = {
    project,
    newEntry,
    newDataset,
    baseStreamId,
    transformedStreamId,
};
