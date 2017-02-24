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


module.exports = {
    getVersion
};
