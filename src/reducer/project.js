"use strict";

const update = require('immutability-helper');

const { Actions } = require('../actions/project');


// HELPER FUNCTIONS ----------------------------------------------------------------------

/**
 * Creates Dataset structure.
 */
function newDataset(id, color = '#000', name = 'New Dataset', entries = []) {
    return {
        id,
        color,
        name,
        entries
    }
}

/**
 * Creates Entry structure.
 */
function newEntry(id, name = 'New Entry', value = []) {
    return {
        id,
        name,
        value
    }
}

// REDUCER FUNCTIONS ----------------------------------------------------------------------

function selectDataset(state, action) {
    return update(state, {
        $merge: {
            path: action.payload,
            error: ''
        }
    });
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
        usedDatasets: {$push: [datasetId]},
        lastDatasetId: {$set: datasetId}
    });
}

function deleteDataset(state, action) {
    const datasetId = action.payload;

    const updatedDatasets = Object.assign({}, state.datasets);
    delete updatedDatasets[datasetId];

    return update(state, {
        usedDatasets: {
            $set: state.usedDatasets.filter(id => id !== datasetId)
        },
        datasets: {
            $set: updatedDatasets
        }
    });
}

function showDatasetDetail(state, action) {
    return update(state, {
        detail: {$set: action.payload}
    });
}

function addEntries(state, action) {
    const {datasetId, values} = action.payload;

    let entryId = state.lastEntryId;

    const entryMap = {};
    const entryIds = [];
    for (let i = 0; i < values.length; i++) {
        entryId += 1;
        const entry = newEntry(entryId, `New Entry ${entryId}`, values[i]);

        entryMap[entry.id] = entry;
        entryIds.push(entry.id);
    }

    return update(state, {
        datasets: {
            [datasetId]: {
                entries: {$push: entryIds}
            }
        },
        entries: {$merge: entryMap},
        lastEntryId: {$set: entryId}
    });
}

const initState = {
    /* path to the project directory */
    path: null,
    /* error */
    error: '',
    /* show detail for dataset */
    detail: null,
    /* dataset IDs used by project */
    usedDatasets: [],
    /* last ID assigned to dataset */
    lastDatasetId: 0,
    /* all datasets */
    datasets: {},
    /* last ID assigned to data */
    lastEntryId: 0,
    /* all data */
    entries: {}
};
const project = (state = initState, action) => {
    switch (action.type) {
        case Actions.SELECT_PROJECT:
            return selectDataset(state, action);
        case Actions.SHOW_PROJECT_ERROR:
            return showProjectError(state, action);
        case Actions.NEW_DATASET:
            return addNewDataset(state, action);
        case Actions.DELETE_DATASET:
            return deleteDataset(state, action);
        case Actions.SHOW_DATASET_DETAIL:
            return showDatasetDetail(state, action);
        case Actions.ADD_ENTRIES:
            return addEntries(state, action);
        default:
            return state;
    }
};

module.exports = {
    project
};
