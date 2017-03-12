"use strict";

const { createAction } = require('./index');


const ACTIONS = {
    PCA_CALC_STARTED: 'PCA_CALC_STARTED',
    PCA_CALC_DONE: 'PCA_CALC_DONE',
    PCA_CALC_FAILED: 'PCA_CALC_FAILED',
    CLEAR: 'CLEAR',
};


/**
 * Creates calculation actions.
 */
class CalculationActionCreator {

    /**
     * Creates an action for starting the calculation.
     * @returns {Object} An action
     */
    static createPcaCalculationStartedAction() {
        return createAction(ACTIONS.PCA_CALC_STARTED);
    }

    /**
     * Creates an action for showing the calculation results.
     * @param pca {Object} Calculation results
     * @param version {number} Version of the results
     * @returns {Object} An action
     */
    static createPcaCalculationDoneAction(pca, version) {
        return createAction(ACTIONS.PCA_CALC_DONE, {pca, version});
    }

    /**
     * Creates an action for showing the calculation error.
     * @param error {string} Error message
     * @returns {Object} An action
     */
    static createPcaCalculationFailedAction(error) {
        return createAction(ACTIONS.PCA_CALC_FAILED, error);
    }

    /**
     * Creates an action for clearing all calculation results.
     * @returns {Object} An action
     */
    static createClearAction() {
        return createAction(ACTIONS.CLEAR);
    }
}

CalculationActionCreator.ACTIONS = ACTIONS;


module.exports = CalculationActionCreator;
