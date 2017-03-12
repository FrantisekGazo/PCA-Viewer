"use strict";


/**
 * Selects data from the Store.
 */
class CalculationSelector {

    /**
     * Returns calculation part of the state.
     * @param state {Object} Current store state
     * @returns {Object}
     */
    static getCalculationState(state) {
        return state.calculation;
    }

    /**
     * Returns current version of the results.
     * @param state {Object} Current store state
     * @returns {number}
     */
    static getVersion(state) {
        return CalculationSelector.getCalculationState(state).version;
    }

    /**
     * Returns calculated PCA.
     * @param state {Object} Current store state
     * @returns {Object}
     */
    static getPCA(state) {
        return CalculationSelector.getCalculationState(state).pca;
    }

    /**
     * Returns selected eigenpairs indexes.
     * @param state {Object} Current store state
     * @returns {[number]}
     */
    static getEigens(state) {
        return CalculationSelector.getCalculationState(state).eigens;
    }

    /**
     * Returns <code>true</code> if calculation is in progress.
     * @param state {Object} Current store state
     * @returns {bool}
     */
    static isLoading(state) {
        return CalculationSelector.getCalculationState(state).loading;
    }

    /**
     * Returns <code>true</code> if calculation has finished successfully.
     * @param state {Object} Current store state
     * @returns {bool}
     */
    static isLoaded(state) {
        return CalculationSelector.getCalculationState(state).loaded;
    }

    /**
     * Returns an error message (if none occurred, then empty string).
     * @param state {Object} Current store state
     * @returns {string}
     */
    static getError(state) {
        return CalculationSelector.getCalculationState(state).error;
    }
}


module.exports = CalculationSelector;
