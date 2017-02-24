"use strict";

const { createAction } = require('./index');


const ACTIONS = {
    START: 'START',
    DONE: 'DONE',
    FAILED: 'FAILED',
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
 * @param results Calculation results
 * @returns {Object} An action
 */
function createDoneAction(results) {
    return createAction(ACTIONS.DONE, results);
}

/**
 * Creates an action for showing the calculation error.
 * @param error Error message
 * @returns {Object} An action
 */
function createFailedAction(error) {
    return createAction(ACTIONS.FAILED, error);
}


module.exports = {
    ACTIONS,
    createStartAction,
    createDoneAction,
    createFailedAction,
};
