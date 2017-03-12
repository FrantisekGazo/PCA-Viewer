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
    static getPca(state) {
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
     * Returns calculated areas.
     * @param state {Object} Current store state
     * @returns {Object}
     */
    static getAreas(state) {
        return CalculationSelector.getCalculationState(state).areas;
    }

    /**
     * Returns calculated areas.
     * @param state {Object} Current store state
     * @returns {Object}
     */
    static getResults(state) {
        const eigens = CalculationSelector.getEigens(state);
        const pca = CalculationSelector.getPca(state);
        const areas = CalculationSelector.getAreas(state);
        const version = CalculationSelector.getVersion(state);

        const projectedData = [];

        if (pca && eigens && areas) {
            const data = pca.data;
            for (let i = 0; i < data.length; i++) {
                const d = data[i];

                const v = d.values;
                const pv = [];
                for (let r = 0; r < v.length; r++) {
                    const row = [];
                    for (let c = 0; c < eigens.length; c++) {
                        row.push(v[r][eigens[c]]);
                    }
                    pv.push(row);
                }

                const pd = Object.assign({}, d, {
                    values: pv,
                    area: areas[i]
                });

                projectedData.push(pd);
            }
        }

        return {
            data: projectedData,
            version: `${version}-` + eigens.map(v => `${v}`).join('-')
        };
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
