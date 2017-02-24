"use strict";


/**
 * Returns calculation part of the state.
 * @param state {Object}
 * @returns {Object}
 */
const getCalculationState = (state) => state.calculation;

/**
 * Returns current version of the results.
 * @param state {Object}
 * @returns {number}
 */
const getVersion = (state) => getCalculationState(state).version;

/**
 * Returns calculated PCA.
 * @param state {Object}
 * @returns {Object}
 */
const getPCA = (state) => getCalculationState(state).pca;

/**
 * Returns <code>true</code> if calculation is in progress.
 * @param state {Object}
 * @returns {bool}
 */
const isLoading = (state) => getCalculationState(state).loading;

/**
 * Returns <code>true</code> if calculation has finished successfully.
 * @param state {Object}
 * @returns {bool}
 */
const isLoaded = (state) => getCalculationState(state).loaded;

/**
 * Returns an error message (if none occurred, then empty string).
 * @param state {Object}
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
