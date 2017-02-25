"use strict";

const { createLogic } = require('redux-logic');

const CalculationAction = require('../action/CalculationAction');
const CalculationSelector = require('../store/selector/CalculationSelector');
const PcaUtil = require('../util/PcaUtil');
const ProjectAction = require('../action/ProjectAction');
const ProjectSelector = require('../store/selector/ProjectSelector');


/**
 * Calculates PCA.
 */
const calculatePCA = createLogic({
    type: [
        ProjectAction.ACTIONS.SET_PROJECT,
        ProjectAction.ACTIONS.UPDATE_DATASET,
        ProjectAction.ACTIONS.DELETE_DATASET,
        ProjectAction.ACTIONS.SET_SAMPLED_ENTRIES,
        ProjectAction.ACTIONS.SET_SAMPLING,
    ],
    latest: true,
    process({ getState, action }, dispatch, done) {
        const state = getState();
        const dataVersion = ProjectSelector.getVersion(state);
        const calcVersion = CalculationSelector.getVersion(state);

        if (calcVersion < dataVersion) {
            dispatch(CalculationAction.createStartAction());
            const datasets = ProjectSelector.getIncludedDatasetsWithEntries(state);

            PcaUtil.calculatePcaAsync(datasets)
                .then((pca) => {
                    console.log('PCA result', pca);
                    dispatch(CalculationAction.createDoneAction(pca, dataVersion));
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

/**
 * Clears the calculation result when the project is closed.
 */
const clearCalulation = createLogic({
    type: [
        ProjectAction.ACTIONS.CLOSE_PROJECT,
    ],
    process({ getState, action }, dispatch, done) {
        const state = getState();
        dispatch(CalculationAction.createClearAction());
        done();
    }
});


module.exports = [
    calculatePCA,
    clearCalulation
];
