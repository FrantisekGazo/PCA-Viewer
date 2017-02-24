"use strict";

const update = require('immutability-helper');

const { ACTIONS } = require('../../action/CalculationAction');


// HELPER FUNCTIONS ----------------------------------------------------------------------


function start(state, action) {
    return update(initState, {
        loading: {$set: true}
    });
}

function done(state, action) {
    const results = action.payload;

    return update(state, {
        loading: {$set: false},
        loaded: {$set: true},
        // results
        eigenvalues: {$set: results.eigenvalues},
        eigenvectors: {$set: results.eigenvectors},
        cumulativeVariance: {$set: results.cumulativeVariance},
        data: {$set: results.data},

        version: {$set: results.version},
    });
}

function failed(state, action) {
    return update(state, {
        loading: {$set: false},
        loaded: {$set: true},
        error: {$set: action.payload},
    });
}

const initState = {
    loading: false,
    laoded: false,
    error: '',

    eigenvalues: [],
    eigenvectors: [],
    cumulativeVariance: [],
    data: [],

    /* this needs to be incremented if results needs to be refreshed */
    version: 0
};
const calculation = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.START:
            return start(state, action);
        case ACTIONS.DONE:
            return done(state, action);
        case ACTIONS.FAILED:
            return failed(state, action);
        default:
            return state;
    }
};

module.exports = {
    calculation,
};
