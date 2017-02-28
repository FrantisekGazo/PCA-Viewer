"use strict";

const { createLogic } = require('redux-logic');
const PCA = require('ml-pca');

const CalculationAction = require('../action/CalculationAction');
const CalculationSelector = require('../store/selector/CalculationSelector');
const PcaUtil = require('../util/PcaUtil');
const ProjectAction = require('../action/ProjectAction');
const ProjectSelector = require('../store/selector/ProjectSelector');
const { PROJECT_TYPE } = require('../store/Constants');


/**
 * Checks if data version was updated and then calculates PCA.
 */
const calculatePCA = createLogic({
    type: [
        ProjectAction.ACTIONS.SET_PROJECT,
        ProjectAction.ACTIONS.UPDATE_DATASET,
        ProjectAction.ACTIONS.DELETE_DATASET,
        ProjectAction.ACTIONS.SET_SAMPLED_ENTRIES,
        ProjectAction.ACTIONS.DELETE_ENTRIES,
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

            const isOnlinePca = ProjectSelector.getType(state) === PROJECT_TYPE.ONLINE_PCA;
            let additionalEntries;
            if (isOnlinePca) {
                const samplingWindow  = ProjectSelector.getSamplingWindow(state);
                additionalEntries = datasets[0].entries.slice(samplingWindow.fixedCount, samplingWindow.fixedCount + samplingWindow.additionalCount);
                datasets[0].entries = datasets[0].entries.slice(0, samplingWindow.fixedCount);
            }

            PcaUtil.calculatePcaAsync(datasets)
                .then((results) => {
                    console.log('PCA result', results);

                    if (results && isOnlinePca && additionalEntries.length > 0) {
                        const pca = PCA.load(results.b);
                        const data = results.data[0];

                        data.entryIds = data.entryIds.concat(additionalEntries.map(entry => entry.id));
                        // project additional entries to the new base
                        const additionalValues = additionalEntries.map(entry => entry.value);
                        const projected = pca.predict(additionalValues);
                        data.values = data.values.concat(projected);
                        console.log('additional PCA result', results);
                    }

                    dispatch(CalculationAction.createDoneAction(results, dataVersion));
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
