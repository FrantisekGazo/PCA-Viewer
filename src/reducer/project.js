"use strict";

const update = require('immutability-helper');

const {Actions} = require('../actions/project');


const initState = {
    /* path to the project directory */
    path: null,
    /* error */
    error: '',
    /* show detail for dataset */
    detail: null,
    /* datasets used by project */
    usedDatasets: [],
    /* last ID assigned to dataset */
    lastDatasetId: 0,
    /* all datasets */
    datasets: {},
    /* last ID assigned to data */
    lastDataId: 0,
    /* all data */
    data: {}
};
const project = (state = initState, action) => {
    switch (action.type) {
        case Actions.SELECT_PROJECT: {
            return update(state, {
                $merge: {
                    path: action.payload,
                    error: ''
                }
            });
        }
        case Actions.SHOW_PROJECT_ERROR: {
            return update(state, {
                $merge: {
                    error: action.payload
                }
            });
        }
        case Actions.NEW_DATASET: {
            const id = state.lastDatasetId + 1;

            return update(state, {
                datasets: {
                    $merge: {
                        [id]: {
                            id: id,
                            name: "New Dataset",
                            data: []
                        }
                    }
                },
                usedDatasets: {$push: [id]},
                lastDatasetId: {$set: id}
            });
        }
        case Actions.DELETE_DATASET: {
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
        case Actions.SHOW_DATASET_DETAIL: {
            return update(state, {
                detail: {$set: action.payload}
            });
        }
        default:
            return state;
    }
};

module.exports = {
    project
};
