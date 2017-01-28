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
        stream: [], // values
        streamTransformationType: 0,
        streamTransformationValue: null,
        transformedStream: [], // values
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
        detail: {$set: datasetId}
    });
}

function updateDataset(state, action) {
    const { id, changes } = action.payload;
    const { dataset, datasetEntries } = changes;

    let maxId = 0;
    if (dataset.entries.length > 0) {
        maxId = sortNumArrayDesc(dataset.entries)[0];
    }
    if (state.lastEntryId > maxId) {
        maxId = state.lastEntryId;
    }

    return update(state, {
        datasets: {
            [id]: {$merge: dataset}
        },
        entries: {$merge: datasetEntries},
        lastEntryId: {$set: maxId}
    });
}

function deleteDataset(state, action) {
    const datasetId = action.payload;

    const updatedDatasets = Object.assign({}, state.datasets);
    delete updatedDatasets[datasetId];

    return update(state, {
        usedDatasetIds: {
            $set: state.usedDatasetIds.filter(id => id !== datasetId)
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

function pcaPending(state, action) {
    return update(state, {
        pca: {
            $set: {
                loaded: false,
                loading: true,
                hash: (state.pca.hash + 1)
            }
        }
    });
}

function pcaReady(state, action) {
    const model = action.payload;
    if (model) {
        const pca = Object.assign({}, model, {
            loaded: true,
            loading: false,
            hash: (state.pca.hash + 1)
        });

        return update(state, {
            pca: {$set: pca}
        });
    } else {
        return update(state, {
            pca: {
                $set: {
                    loaded: false,
                    loading: false,
                    hash: (state.pca.hash + 1)
                }
            }
        });
    }
}

function setUsedEigenpairs(state, action) {
    const newIndexes = action.payload;
    return update(state, {
        usedEigenpairs: {$set: newIndexes},
        pca: {
            hash: {$set: state.pca.hash + 1}
        }
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
    usedDatasetIds: [],
    /* last ID assigned to dataset */
    lastDatasetId: 0,
    /* all datasets */
    datasets: {},
    /* last ID assigned to data */
    lastEntryId: 0,
    /* all data */
    entries: {},
    pca: {
        loading: false,
        loaded: false,
        cumulativeVariance: [],
        eigenvalues: [],
        eigenvectors: [],
        transformedEntries: [],
        hash: 0
    },
    usedEigenpairs: [0, 1]
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
        case Actions.PCA_PENDING:
            return pcaPending(state, action);
        case Actions.PCA_READY:
            return pcaReady(state, action);
        case Actions.SET_USED_EIGENPAIRS:
            return setUsedEigenpairs(state, action);
        default:
            return state;
    }
};

module.exports = {
    project,
    newEntry,
    newDataset
};
