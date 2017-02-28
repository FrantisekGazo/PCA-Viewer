"use strict";


/**
 * Returns calculation part of the state.
 * @param state {Object} Current store state
 * @returns {Object}
 */
const getCalculationState = (state) => state.calculation;

/**
 * Returns current version of the results.
 * @param state {Object} Current store state
 * @returns {number}
 */
const getVersion = (state) => getCalculationState(state).version;

/**
 * Returns calculated PCA.
 * @param state {Object} Current store state
 * @returns {Object}
 */
const getPCA = (state) => getCalculationState(state).pca;

/**
 * Returns <code>true</code> if calculation is in progress.
 * @param state {Object} Current store state
 * @returns {bool}
 */
const isLoading = (state) => getCalculationState(state).loading;

/**
 * Returns <code>true</code> if calculation has finished successfully.
 * @param state {Object} Current store state
 * @returns {bool}
 */
const isLoaded = (state) => getCalculationState(state).loaded;

/**
 * Returns an error message (if none occurred, then empty string).
 * @param state {Object} Current store state
 * @returns {string}
 */
const getError = (state) => getCalculationState(state).error;


module.exports = {
    getVersion,
    getPCA,
    isLoading,
    isLoaded,
    getError,
};
