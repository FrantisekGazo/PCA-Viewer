"use strict";

const { createAction } = require('./index');


const ACTIONS = {
    START: 'START',
    DONE: 'DONE',
    FAILED: 'FAILED',
    CLEAR: 'CLEAR',
};


/**
 * Creates an action for starting the calculation.
 * @returns {Object} An action
 */
function createStartAction() {
    return createAction(ACTIONS.START);
}

/**
 * Creates an action for showing the calculation results.
 * @param pca {Object} Calculation results
 * @param version {number} Version of the results
 * @returns {Object} An action
 */
function createDoneAction(pca, version) {
    return createAction(ACTIONS.DONE, {pca, version});
}

/**
 * Creates an action for showing the calculation error.
 * @param error {string} Error message
 * @returns {Object} An action
 */
function createFailedAction(error) {
    return createAction(ACTIONS.FAILED, error);
}

/**
 * Creates an action for clearing all calculation results.
 * @returns {Object} An action
 */
function createClearAction() {
    return createAction(ACTIONS.CLEAR);
}


module.exports = {
    ACTIONS,
    createStartAction,
    createDoneAction,
    createFailedAction,
    createClearAction,
};
