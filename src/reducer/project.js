"use strict";

const update = require('immutability-helper');

const {Actions} = require('../actions/project');
const { sortNumArrayDesc } = require('../util/util');


// HELPER FUNCTIONS ----------------------------------------------------------------------

const DEFAULT_SAMPLING = 100;

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
        sampling: DEFAULT_SAMPLING, // number of stream values in 1 entry
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

const TRANSFORMATIONS = {
    NONE: 1,
    DIFF: 2,
    COUNT: 3
};

const baseStreamId = (datasetId) => `${datasetId}_base`;

const transformedStreamId = (datasetId) => `${datasetId}_used`;

// REDUCER FUNCTIONS ----------------------------------------------------------------------

function setProject(state, action) {
    return action.payload;
}

function selectProject(state, action) {
    const path = action.payload;
    if (path !== null) {
        return update(state, {
            path: {$set: path},
            error: {$set: ''}
        });
    } else {
        return initState;
    }
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
    // prepare stream IDs
    const bsid = baseStreamId(datasetId);
    const tsid = transformedStreamId(datasetId);
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
        streams: {
            [bsid]: {$set: stream},
            [tsid]: {$set: transformedStream}
        },
        usedDatasetIds: {$set: newUsedDatasetIds},
        resultsVersion: {$set: state.resultsVersion + 1}
    });
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
        resultsVersion: {$set: resultsVersion}
    });
}

function showDatasetDetail(state, action) {
    return update(state, {
        detailDatasetId: {$set: action.payload}
    });
}

function selectEntries(state, action) {
    const entryIds = action.payload;

    return update(state, {
        detailEntryIds: {$set: entryIds}
    });
}

const initState = {
    /* path to the project directory */
    path: null,
    /* error */
    error: '',
    /* show detail for dataset */
    detailDatasetId: null,
    detailEntryIds: null,
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
    /* this needs to be incremented if results needs to be refreshed */
    resultsVersion: 0
};
const project = (state = initState, action) => {
    switch (action.type) {
        case Actions.SET_PROJECT:
            return setProject(state, action);
        case Actions.SELECT_PROJECT:
            return selectProject(state, action);
        case Actions.SHOW_PROJECT_ERROR:
            return showProjectError(state, action);
        case Actions.NEW_DATASET:
            return addNewDataset(state, action);
        case Actions.UPDATE_DATASET:
            return updateDataset(state, action);
        case Actions.DELETE_DATASET:
            return deleteDataset(state, action);
        case Actions.SHOW_DATASET_DETAIL:
            return showDatasetDetail(state, action);
        case Actions.SELECT_ENTRIES:
            return selectEntries(state, action);
        default:
            return state;
    }
};

module.exports = {
    TRANSFORMATIONS,
    project,
    newEntry,
    newDataset,
    baseStreamId,
    transformedStreamId,
};
