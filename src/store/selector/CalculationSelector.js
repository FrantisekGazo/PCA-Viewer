"use strict";


/**
 * Selects data from the Store.
 */
class CalculationSelector {

    /**
     * Returns calculation part of the state.
     * @param state {Object} Current store state
     * @returns {Object}
     * @private
     */
    _getCalculationState(state) {
        return state.calculation;
    }

    /**
     * Returns current version of the results.
     * @param state {Object} Current store state
     * @returns {number}
     */
    getVersion(state) {
        return this._getCalculationState(state).version;
    }

    /**
     * Returns calculated PCA.
     * @param state {Object} Current store state
     * @returns {Object}
     */
    getPca(state) {
        return this._getCalculationState(state).pca;
    }

    /**
     * Returns selected eigenpairs indexes.
     * @param state {Object} Current store state
     * @returns {[number]}
     */
    getEigens(state) {
        return this._getCalculationState(state).eigens;
    }

    /**
     * Returns calculated areas.
     * @param state {Object} Current store state
     * @returns {Object}
     */
    getAreas(state) {
        return this._getCalculationState(state).areas;
    }

    /**
     * Returns calculated areas.
     * @param state {Object} Current store state
     * @returns {Object}
     */
    getResults(state) {
        const eigens = this.getEigens(state);
        const pca = this.getPca(state);
        const areas = this.getAreas(state);
        const version = this.getVersion(state);

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
    isLoading(state) {
        return this._getCalculationState(state).loading;
    }

    /**
     * Returns <code>true</code> if calculation has finished successfully.
     * @param state {Object} Current store state
     * @returns {bool}
     */
    isLoaded(state) {
        return this._getCalculationState(state).loaded;
    }

    /**
     * Returns an error message (if none occurred, then empty string).
     * @param state {Object} Current store state
     * @returns {string}
     */
    getError(state) {
        return this._getCalculationState(state).error;
    }

    /**
     * Returns <code>true</code> if areas are shown.
     * @param state {Object} Current store state
     * @returns {boolean}
     */
    areAreasShown(state) {
        return this._getCalculationState(state).showAreas;
    }

    /**
     * Returns the value of area coefficient.
     * @param state {Object} Current store state
     * @returns {number}
     */
    getAreaCoefficient(state) {
        return this._getCalculationState(state).areaCoefficient;
    }
}


module.exports = new CalculationSelector();
