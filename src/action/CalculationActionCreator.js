"use strict";

const { createAction } = require('./index');


const ACTIONS = {
    PCA_CALC_STARTED: 'PCA_CALC_STARTED',
    PCA_CALC_DONE: 'PCA_CALC_DONE',
    PCA_CALC_FAILED: 'PCA_CALC_FAILED',

    SET_EIGENS: 'SET_EIGENS',

    AREA_CALC_STARTED: 'AREA_CALC_STARTED',
    AREA_CALC_DONE: 'AREA_CALC_DONE',
    AREA_CALC_FAILED: 'AREA_CALC_FAILED',

    CLEAR: 'CLEAR',
};


/**
 * Creates calculation actions.
 */
class CalculationActionCreator {

    /**
     * Creates an action for starting the PCA calculation.
     * @returns {Object} An action
     */
    static createPcaCalculationStartedAction() {
        return createAction(ACTIONS.PCA_CALC_STARTED);
    }

    /**
     * Creates an action for showing the PCA calculation results.
     * @param pca {Object} Calculation results
     * @param version {number} Version of the results
     * @returns {Object} An action
     */
    static createPcaCalculationDoneAction(pca, version) {
        return createAction(ACTIONS.PCA_CALC_DONE, {pca, version});
    }

    /**
     * Creates an action for showing the PCA calculation error.
     * @param error {string} Error message
     * @returns {Object} An action
     */
    static createPcaCalculationFailedAction(error) {
        return createAction(ACTIONS.PCA_CALC_FAILED, error);
    }

    /**
     * Creates an action for setting new eigenpair indexes.
     * @param eigens {[number]} Eigenpair indexes.
     * @returns {Object} An action
     */
    static createSetEigensAction(eigens) {
        return createAction(ACTIONS.SET_EIGENS, eigens);
    }

    /**
     * Creates an action for starting the area calculation.
     * @returns {Object} An action
     */
    static createAreaCalculationStartedAction() {
        return createAction(ACTIONS.AREA_CALC_STARTED);
    }

    /**
     * Creates an action for showing the area calculation results.
     * @param areas {[Object]} Calculation results
     * @param version {number} Version of the results
     * @returns {Object} An action
     */
    static createAreaCalculationDoneAction(areas, version) {
        return createAction(ACTIONS.AREA_CALC_DONE, {areas, version});
    }

    /**
     * Creates an action for showing the area calculation error.
     * @param error {string} Error message
     * @returns {Object} An action
     */
    static createAreaCalculationFailedAction(error) {
        return createAction(ACTIONS.AREA_CALC_FAILED, error);
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
