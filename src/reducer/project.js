"use strict";

const update = require('immutability-helper');

const {Actions} = require('../actions/project');
const { sortNumArrayDesc } = require('../util/util');


// HELPER FUNCTIONS ----------------------------------------------------------------------

const DEFAULT_SAMPLING = 10;

/**
 * Creates Dataset structure.
 */
function newDataset(id) {
    return {
        id: id,
        name: `Dataset ${id}`,
        desc: '',
        color: '#000000',
        // raw data
        entries: [], // entry IDs
        // stream data
        transformationType: TRANSFORMATIONS.NONE, // stream transformation type
        transformationValue: 0, // stream transformation value
        sampling: DEFAULT_SAMPLING, // number of stream values in 1 entry
        streamEntries: [] // entry IDs - for entries sampled from the stream
    }
}

/**
 * Creates Entry structure.
 */
function newEntry(id, value=[]) {
    return {
        id: id,
        name: `E${id}`,
        color: undefined,
        value: value,
        streamPosition: undefined
    }
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
    if (path == null) {
        return Object.assign({}, initState, {path: path});
    } else {
        return update(state, {
            $merge: {
                path: path,
                error: ''
            }
        });
    }
}

function showProjectError(state, action) {
    return update(state, {
        $merge: {
            error: action.payload
        }
    });
}

function addNewDataset(state, action) {
    const datasetId = state.lastDatasetId + 1;

    return update(state, {
        datasets: {
            $merge: {
                [datasetId]: newDataset(datasetId)
            }
        },
        usedDatasetIds: {$push: [datasetId]},
        lastDatasetId: {$set: datasetId},
        detailDatasetId: {$set: datasetId}
    });
}

function updateDataset(state, action) {
    const { id, changes } = action.payload;
    const { dataset, entries, stream, transformedStream } = changes;

    let maxId = 0;
    if (dataset.entries.length > 0) {
        maxId = sortNumArrayDesc(dataset.entries)[0];
    }
    if (state.lastEntryId > maxId) {
        maxId = state.lastEntryId;
    }

    const bsid = baseStreamId(id);
    const tsid = transformedStreamId(id);
    return update(state, {
        datasets: {
            [id]: {$set: dataset}
        },
        entries: {$merge: entries},
        lastEntryId: {$set: maxId},
        streams: {
            [bsid]: {$set: stream},
            [tsid]: {$set: transformedStream}
        },
        resultsVersion: {$set: state.resultsVersion + 1}
    });
}

function deleteDataset(state, action) {
    const datasetId = action.payload;

    const hasEntries = (state.datasets[datasetId].entries.length > 0);
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
        /* TODO : remove also entries */
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
