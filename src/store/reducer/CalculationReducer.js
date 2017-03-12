"use strict";

const update = require('immutability-helper');

const { ACTIONS } = require('../../action/CalculationActionCreator');


/**
 * Starts the PCA calculation.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: undefined}} Received action without a payload
 * @returns {Object} New state
 */
function pcaCalcStarted(state, action) {
    return update(initState, {
        loading: {$set: true},
        eigens: {$set: state.eigens} // keep selected eigens
    });
}

/**
 * Finishes the PCA calculation.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: Object}} Received action with the calculation result
 * @returns {Object} New state
 */
function pcaCalcDone(state, action) {
    const { pca, version } = action.payload;

    return update(state, {
        loading: {$set: false},
        loaded: {$set: true},
        // results
        pca: {$set: pca},
        version: {$set: version},
    });
}

/**
 * Fails the PCA calculation.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: string}} Received action with the calculation error message
 * @returns {Object} New state
 */
function pcaCalcFailed(state, action) {
    return update(state, {
        loading: {$set: false},
        loaded: {$set: false},
        error: {$set: action.payload},
    });
}

/**
 * Set selected aigenpairs.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: [number]}} Received action with the selected eigenpairs
 * @returns {Object} New state
 */
function setEigens(state, action) {
    return update(state, {
        eigens: {$set: action.payload}
    });
}

/**
 * Starts the area calculation.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: undefined}} Received action without a payload
 * @returns {Object} New state
 */
function areaCalcStarted(state, action) {
    return update(state, {
        loading: {$set: true},
        areas: {$set: null}
    });
}

/**
 * Finishes the area calculation.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: Object}} Received action with the calculation result
 * @returns {Object} New state
 */
function areaCalcDone(state, action) {
    const { areas, version } = action.payload;

    return update(state, {
        loading: {$set: false},
        loaded: {$set: true},
        // results
        areas: {$set: areas},
    });
}

/**
 * Fails the area calculation.
 *
 * @param state {Object} Current state
 * @param action {{type: string, payload: string}} Received action with the calculation error message
 * @returns {Object} New state
 */
function areaCalcFailed(state, action) {
    return update(state, {
        loading: {$set: false},
        loaded: {$set: false},
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
    /* selected eigenpairs for PCA space */
    eigens: [0, 1],
    /* calculated areas */
    areas: null,

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
            return pcaCalcStarted(state, action);
        case ACTIONS.PCA_CALC_DONE:
            return pcaCalcDone(state, action);
        case ACTIONS.PCA_CALC_FAILED:
            return pcaCalcFailed(state, action);
        case ACTIONS.SET_EIGENS:
            return setEigens(state, action);
        case ACTIONS.AREA_CALC_STARTED:
            return areaCalcStarted(state, action);
        case ACTIONS.AREA_CALC_DONE:
            return areaCalcDone(state, action);
        case ACTIONS.AREA_CALC_FAILED:
            return areaCalcFailed(state, action);
        case ACTIONS.CLEAR:
            return clear(state, action);
        default:
            return state;
    }
}

module.exports = {
    calculation,
};
