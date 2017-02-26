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
    ],
    latest: true,
    process({ getState, action }, dispatch, done) {
        const state = getState();
        // if project contains streams this will be called after entries are sampled
        if (!ProjectSelector.getSamplingWindow(state).isConstant
            && action.type === ProjectAction.ACTIONS.UPDATE_DATASET) {
            done();
            return;
        }

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
