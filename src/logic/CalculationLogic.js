"use strict";

const { createLogic } = require('redux-logic');

const CalculationAction = require('../action/CalculationAction');
const CalculationSelector = require('../store/selector/CalculationSelector');
const PcaService = require('../service/PcaService');
const ProjectAction = require('../action/ProjectAction');
const ProjectSelector = require('../store/selector/ProjectSelector');


/**
 * Calculates PCA.
 */
const calculatePCA = createLogic({
    type: [
        ProjectAction.ACTIONS.UPDATE_DATASET,
        ProjectAction.ACTIONS.DELETE_DATASET,
    ],
    process({ getState, action }, dispatch, done) {
        const state = getState();
        const dataVersion = ProjectSelector.getVersion(state);
        const calcVersion = CalculationSelector.getVersion(state);

        if (calcVersion < dataVersion) {
            const datasets = ProjectSelector.getIncludedDatasetsWithEntries(state);

            PcaService.calculatePcaAsync(datasets)
                .then((results) => {
                    results.version = dataVersion;
                    dispatch(CalculationAction.createDoneAction(results));
                })
                .catch((error) => {
                    console.error('PCA error', error);
                    dispatch(CalculationAction.createFailedAction(error.message));
                })
                .then(() => done());
        } else {
            done();
        }
    }
});


module.exports = [
    calculatePCA
];
