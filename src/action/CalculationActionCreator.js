"use strict";

const BaseActionCreator = require('./BaseActionCreator');


/**
 * Creates calculation actions.
 */
class CalculationActionCreator extends BaseActionCreator {

    constructor() {
        super({
            PCA_CALC_STARTED: 'PCA_CALC_STARTED',
            PCA_CALC_DONE: 'PCA_CALC_DONE',
            PCA_CALC_FAILED: 'PCA_CALC_FAILED',

            SET_EIGENS: 'SET_EIGENS',

            SET_AREAS: 'SET_AREAS',

            CLEAR: 'CLEAR',
        });
    }

    /**
     * Creates an action for starting the PCA calculation.
     * @returns {Object} An action
     */
    createPcaCalculationStartedAction() {
        return this.createAction(this.ACTIONS.PCA_CALC_STARTED);
    }

    /**
     * Creates an action for showing the PCA calculation results.
     * @param pca {Object} Calculation results
     * @param version {number} Version of the results
     * @returns {Object} An action
     */
    createPcaCalculationDoneAction(pca, version) {
        return this.createAction(this.ACTIONS.PCA_CALC_DONE, {pca, version});
    }

    /**
     * Creates an action for showing the PCA calculation error.
     * @param error {string} Error message
     * @returns {Object} An action
     */
    createPcaCalculationFailedAction(error) {
        return this.createAction(this.ACTIONS.PCA_CALC_FAILED, error);
    }

    /**
     * Creates an action for setting new eigenpair indexes.
     * @param eigens {[number]} Eigenpair indexes.
     * @returns {Object} An action
     */
    createSetEigensAction(eigens) {
        return this.createAction(this.ACTIONS.SET_EIGENS, eigens);
    }

    /**
     * Creates an action for setting the calculated areas.
     * @returns {Object} An action
     */
    createSetAreasAction(areas) {
        return this.createAction(this.ACTIONS.SET_AREAS, areas);
    }

    /**
     * Creates an action for clearing all calculation results.
     * @returns {Object} An action
     */
    createClearAction() {
        return this.createAction(this.ACTIONS.CLEAR);
    }
}


module.exports = new CalculationActionCreator();
