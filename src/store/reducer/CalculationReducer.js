"use strict";

const update = require('immutability-helper');

const { ACTIONS } = require('../../action/CalculationActionCreator');


// HELPER FUNCTIONS ----------------------------------------------------------------------


/**
 * Starts the calculation.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: undefined}} Received action without a payload
 * @returns {Object} New state
 */
function start(state, action) {
    return update(initState, {
        loading: {$set: true}
    });
}

/**
 * Finishes the calculation.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: Object}} Received action with the calculation result
 * @returns {Object} New state
 */
function done(state, action) {
    const results = action.payload;

    return update(state, {
        loading: {$set: false},
        loaded: {$set: true},
        // results
        pca: {$set: results.pca},
        version: {$set: results.version},
    });
}

/**
 * Fails the calculation.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: string}} Received action with the calculation error message
 * @returns {Object} New state
 */
function failed(state, action) {
    return update(state, {
        loading: {$set: false},
        loaded: {$set: true},
        error: {$set: action.payload},
    });
}

/**
 * Clears the calculation state.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: undefined}} Received action without a payload
 * @returns {Object} New state
 */
function clear(state, action) {
    return initState;
}

/**
 * Initial state of this calculation reducer
 */
const initState = {
    loading: false,
    loaded: true,
    error: '',

    /* calculated PCA */
    pca: null,

    /* this needs to be incremented if results needs to be refreshed */
    version: 0
};


/**
 * Updates calculation state based on received action.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: *}} Received action
 * @returns {Object} New state
 */
function calculation(state = initState, action) {
    switch (action.type) {
        case ACTIONS.PCA_CALC_STARTED:
            return start(state, action);
        case ACTIONS.PCA_CALC_DONE:
            return done(state, action);
        case ACTIONS.PCA_CALC_FAILED:
            return failed(state, action);
        case ACTIONS.CLEAR:
            return clear(state, action);
        default:
            return state;
    }
}

module.exports = {
    calculation,
};
