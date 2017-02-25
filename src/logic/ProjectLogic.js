"use strict";

const fs = require('fs');
const path = require('path');
const { createLogic } = require('redux-logic');

const ProjectAction = require('../action/ProjectAction');
const RouterAction = require('../action/RouterAction');
const ProjectSelector = require('../store/selector/ProjectSelector');
const ProjectReducer = require('../store/reducer/ProjectReducer');
const { PROJECT_TYPE, PROJECT_FILE_NAME } = require('../store/Constants');
const FileUtil = require('../util/FileUtil');
const { sortNumArrayAsc } = require('../util');


/**
 * Loads project from a file.
 */
const loadProject = createLogic({
    type: ProjectAction.ACTIONS.LOAD_PROJECT,
    process({ getState, action }, dispatch, done) {
        const projectPath = action.payload;
        const filePath = path.join(projectPath, PROJECT_FILE_NAME);

        dispatch(RouterAction.createGoToProjectScreenLoadingAction());

        // check if project file exists
        if (!fs.existsSync(filePath)) {
            dispatch(ProjectAction.createProjectErrorAction('Selected directory is not a PCA project'));
            done();
        }

        FileUtil.readFromFile(filePath)
            .then((data) => {
                const projectState = JSON.parse(data);
                projectState.path = projectPath;
                projectState.detailDatasetId = null; // do not show detail after opening a project

                dispatch(ProjectAction.createSetProjectAction(projectState));
            })
            .catch((err) => {
                dispatch(ProjectAction.createProjectErrorAction(err.message));
            })
            .then(() => done());
    }
});

/**
 * Navigates to the correct project screen depending on project type.
 */
const openProjectScreen = createLogic({
    type: ProjectAction.ACTIONS.SET_PROJECT,
    process({ getState, action }, dispatch, done) {
        const state = getState();
        const type = ProjectSelector.getType(state);
        const samplingWindow = ProjectSelector.getSamplingWindow(state);

        if (type === PROJECT_TYPE.ONLINE_PCA) {
            dispatch(RouterAction.createGoToProjectScreenOnlineAction());
        } else if (samplingWindow.isConstant) {
            dispatch(RouterAction.createGoToProjectScreenOfflineConstantAction());
        } else {
            dispatch(RouterAction.createGoToProjectScreenOfflineAction());
        }
        done();
    }
});

/**
 * Navigates back to the start screen.
 */
const closeProjectScreen = createLogic({
    type: ProjectAction.ACTIONS.CLOSE_PROJECT,
    process({ getState, action }, dispatch, done) {
        dispatch(RouterAction.createGoToStartScreenAction());
        done();
    }
});

/**
 * Saves the open project to a file.
 */
const saveProject = createLogic({
    type: ProjectAction.ACTIONS.SAVE_PROJECT,
    process({ getState, action }, dispatch, done) {
        const state = getState();
        const projectPath = ProjectSelector.getPath(state);

        const filePath = path.join(projectPath, PROJECT_FILE_NAME);
        const json = JSON.stringify(state.project);
        FileUtil.writeToFile(filePath, json);

        done();
    }
});

/**
 * Validates if dataset detail can be shown.
 */
const validateShowDataset = createLogic({
    type: ProjectAction.ACTIONS.SHOW_DATASET_DETAIL,
    validate({ getState, action }, allow, reject) {
        const currentId = ProjectSelector.getDetailDatasetId(getState());
        const datasetId = action.payload;

        if (currentId !== datasetId) {
            allow(action);
        } else { // do not show if it is already shown
            reject();
        }
    }
});



/**
 * Validates selected entries. This also makes sure no ID is selected twice.
 */
const validateSelectedEntries = createLogic({
    type: ProjectAction.ACTIONS.SELECT_ENTRIES,
    validate({ getState, action }, allow, reject) {
        const entryIds = action.payload;
        const currentIds = ProjectSelector.getDetailEntryIds(getState());

        if (currentIds && currentIds.length > 0) {
            if (entryIds.length > 0) {
                let ids = sortNumArrayAsc(entryIds.concat(currentIds));
                for (let i = 0; i < ids.length; ++i) {
                    for (let j = i + 1; j < ids.length; ++j) {
                        if (ids[i] === ids[j]) {
                            ids.splice(j--, 1);
                        }
                    }
                }

                if (currentIds.length !== ids.length) {
                    allow(ProjectAction.createSelectEntryAction(ids));
                } else {
                    reject();
                }
            } else {
                allow(action);
            }
        } else {
            allow(ProjectAction.createSelectEntryAction(sortNumArrayAsc(entryIds)));
        }
    }
});

/**
 * Validates new sampling.
 */
const validateNewSampling = createLogic({
    type: ProjectAction.ACTIONS.SET_SAMPLING,
    validate({ getState, action }, allow, reject) {
        const samplingWindow = ProjectSelector.getSamplingWindow(getState());
        const newSamplingWindow = Object.assign({}, samplingWindow, action.payload);

        if (newSamplingWindow.size < 4
            || newSamplingWindow.start < 0
            || newSamplingWindow.fixedCount <= 0
            || newSamplingWindow.additionalCount < 0) {
            reject();
        } else {
            allow(Object.assign({}, action, {payload: newSamplingWindow}));
        }
    }
});

/**
 * Samples streams.
 */
const sampleStreams = createLogic({
    type: [
        ProjectAction.ACTIONS.SET_SAMPLING,
        ProjectAction.ACTIONS.UPDATE_DATASET,
    ],
    latest: true,
    process({ getState, action }, dispatch, done) {
        const state = getState();
        const samplingWindow = ProjectSelector.getSamplingWindow(state);

        // if project has constant sampling, data are sampled during loading
        if (samplingWindow.isConstant) {
            done();
            return;
        }

        const isOnline = ProjectSelector.getType(state) === PROJECT_TYPE.ONLINE_PCA;
        const sampling = samplingWindow.size;

        const entries = {};
        let entryId = 1;

        const datasets = ProjectSelector.getAllDatasets(state);
        let dataset, stream, entry;
        for (let i = 0; i < datasets.length; i++) {
            dataset = datasets[i];
            stream = ProjectSelector.getDatasetTransformedStream(state, dataset.id);

            let c = 0;
            for (let j = samplingWindow.start; j <= stream.length - sampling; j += sampling) {
                if (isOnline && c > samplingWindow.fixedCount) {
                    break;
                } else {
                    c++;
                }

                entry = ProjectReducer.newEntry({
                    id: entryId++,
                    datasetId: dataset.id,
                    value: stream.slice(j, j + sampling)
                });
                entries[entry.id] = entry;
            }
        }
        dispatch(ProjectAction.createSetSampledEntriesAction(entries));
        done();
    }
});


module.exports = [
    loadProject,
    openProjectScreen,
    closeProjectScreen,
    saveProject,
    validateShowDataset,
    validateSelectedEntries,
    validateNewSampling,
    sampleStreams,
];
