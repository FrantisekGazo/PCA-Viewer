"use strict";

const update = require('immutability-helper');

const {Actions} = require('../actions/project');


const initState = {
    path: null,
    error: '',
    usedDataSets: [],
    dataSets: {},
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
        default:
            return state;
    }
};

module.exports = {
    project
};
