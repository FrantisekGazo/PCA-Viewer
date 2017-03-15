"use strict";

const { createLogic } = require('redux-logic');
const Matrix = require('ml-matrix');

const CalculationActionCreator = require('../action/CalculationActionCreator');
const CalculationSelector = require('../store/selector/CalculationSelector');
const CalculationUtil = require('../util/CalculationUtil');
const ProjectActionCreator = require('../action/ProjectActionCreator');
const ProjectSelector = require('../store/selector/ProjectSelector');
const { PROJECT_TYPE, ADDITIONAL_SAMPLES_COUNT } = require('../store/Constants');


/**
 * Checks if data version was updated and then calculates PCA.
 */
const calculatePCA = createLogic({
    type: [
        ProjectActionCreator.ACTIONS.SET_PROJECT,
        ProjectActionCreator.ACTIONS.UPDATE_DATASET,
        ProjectActionCreator.ACTIONS.DELETE_DATASET,
        ProjectActionCreator.ACTIONS.SET_SAMPLED_ENTRIES,
        ProjectActionCreator.ACTIONS.DELETE_ENTRIES,
    ],
    latest: true,
    process({ getState, action }, dispatch, done) {
        const state = getState();
        // if project contains streams this will be called after entries are sampled
        if (!ProjectSelector.getSamplingWindow(state).isConstant
            && action.type === ProjectActionCreator.ACTIONS.UPDATE_DATASET) {
            done();
            return;
        }

        const dataVersion = ProjectSelector.getVersion(state);
        const calcVersion = CalculationSelector.getVersion(state);

        if (calcVersion < dataVersion) {
            dispatch(CalculationActionCreator.createPcaCalculationStartedAction());
            const datasets = ProjectSelector.getIncludedDatasetsWithEntries(state);
            const eigens = CalculationSelector.getEigens(state);
            const k = CalculationSelector.getAreaCoefficient(state);

            const isOnlinePca = ProjectSelector.getType(state) === PROJECT_TYPE.ONLINE_PCA;
            let additionalEntries;
            if (isOnlinePca) {
                const samplingWindow  = ProjectSelector.getSamplingWindow(state);
                additionalEntries = datasets[0].entries.slice(
                    samplingWindow.fixedCount, samplingWindow.fixedCount + ADDITIONAL_SAMPLES_COUNT);
                datasets[0].entries = datasets[0].entries.slice(0, samplingWindow.fixedCount);
            }

            CalculationUtil.calculatePcaAsync(datasets)
                .then((results) => {
                    console.log('PCA result', results);

                    return CalculationUtil.calculateAreasAsync(results, eigens, k)
                        .then((areas) => {
                            dispatch(CalculationActionCreator.createSetAreasAction(areas));

                            if (results && isOnlinePca && additionalEntries.length > 0) {
                                const data = results.data;

                                const entryIds = additionalEntries.map(entry => entry.id);
                                // project additional entries to the new base
                                const additionalValues = additionalEntries.map(entry => entry.value);
                                const M = new Matrix(additionalValues);
                                const U = new Matrix(results.eigenvectors);
                                const C = M.mmul(U);

                                data.push(Object.assign({}, data[0], {
                                    color: '#ff2200',
                                    values: C.to2DArray(),
                                    entryIds: entryIds,
                                    additional: true
                                }));

                                console.log('additional PCA result', results);
                            }

                            dispatch(CalculationActionCreator.createPcaCalculationDoneAction(results, dataVersion));
                        });
                })
                .catch((error) => {
                    console.error('PCA error', error);
                    dispatch(CalculationActionCreator.createPcaCalculationFailedAction(error.message));
                })
                .then(() => done());
        } else {
            done();
        }
    }
});

/**
 * Updates calculated areas.
 */
const recalculateAreas = createLogic({
    type: [
        CalculationActionCreator.ACTIONS.SET_EIGENS,
        CalculationActionCreator.ACTIONS.SET_AREA_COEF,
    ],
    process({ getState, action }, dispatch, done) {
        const state = getState();
        const pca = CalculationSelector.getPca(state);
        const eigens = CalculationSelector.getEigens(state);
        const k = CalculationSelector.getAreaCoefficient(state);

        CalculationUtil.calculateAreasAsync(pca, eigens, k)
            .then((areas) => {
                dispatch(CalculationActionCreator.createSetAreasAction(areas));
            })
            .catch((error) => {
                console.error('AREA error', error);
                dispatch(CalculationActionCreator.createPcaCalculationFailedAction(error.message));
            })
            .then(() => done());
    }
});

/**
 * Clears the calculation result when the project is closed.
 */
const clearCalulation = createLogic({
    type: [
        ProjectActionCreator.ACTIONS.CLOSE_PROJECT,
    ],
    process({ getState, action }, dispatch, done) {
        const state = getState();
        dispatch(CalculationActionCreator.createClearAction());
        done();
    }
});


module.exports = [
    calculatePCA,
    recalculateAreas,
    clearCalulation
];
