"use strict";

const fs = require('fs');
const path = require('path');
const { createLogic } = require('redux-logic');

const ProjectActionCreator = require('../action/ProjectActionCreator');
const RouterActionCreator = require('../action/RouterActionCreator');
const ProjectSelector = require('../store/selector/ProjectSelector');
const ProjectReducer = require('../store/reducer/ProjectReducer');
const { PROJECT_TYPE, PROJECT_FILE_NAME } = require('../store/Constants');
const FileUtil = require('../util/FileUtil');
const StreamUtil = require('../util/StreamUtil');
const { sortNumArrayAsc } = require('../util');


/**
 * Loads project from a file.
 */
const loadProject = createLogic({
    type: ProjectActionCreator.ACTIONS.LOAD_PROJECT,
    process({ getState, action }, dispatch, done) {
        const projectPath = action.payload;
        const filePath = path.join(projectPath, PROJECT_FILE_NAME);

        // check if project file exists
        if (!fs.existsSync(filePath)) {
            dispatch(ProjectActionCreator.createProjectErrorAction('Selected directory is not a PCA project'));
            done();
            return;
        }

        dispatch(RouterActionCreator.createGoToProjectScreenLoadingAction());

        FileUtil.readJsonFromFile(filePath)
            .then((projectState) => {
                projectState.path = projectPath;
                projectState.detailDatasetId = null; // do not show detail after opening a project

                dispatch(ProjectActionCreator.createSetProjectAction(projectState));
            })
            .catch((err) => {
                dispatch(ProjectActionCreator.createProjectErrorAction(err.message));
            })
            .then(() => done());
    }
});

/**
 * Navigates to the correct project screen depending on stored project type.
 */
const openProjectScreen = createLogic({
    type: ProjectActionCreator.ACTIONS.SET_PROJECT,
    process({ getState, action }, dispatch, done) {
        const state = getState();
        const type = ProjectSelector.getType(state);
        const samplingWindow = ProjectSelector.getSamplingWindow(state);

        if (type === PROJECT_TYPE.ONLINE_PCA) {
            dispatch(RouterActionCreator.createGoToProjectScreenOnlineAction());
        } else if (samplingWindow.isConstant) {
            dispatch(RouterActionCreator.createGoToProjectScreenOfflineConstantAction());
        } else {
            dispatch(RouterActionCreator.createGoToProjectScreenOfflineAction());
        }
        done();
    }
});

/**
 * Navigates back to the start screen when project is closed.
 */
const closeProjectScreen = createLogic({
    type: ProjectActionCreator.ACTIONS.CLOSE_PROJECT,
    process({ getState, action }, dispatch, done) {
        dispatch(RouterActionCreator.createGoToStartScreenAction());
        done();
    }
});

/**
 * Saves the project to a file.
 */
const saveProject = createLogic({
    type: ProjectActionCreator.ACTIONS.SAVE_PROJECT,
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
 * Validates if dataset detail can be shown. (It won't be set if it already is shown)
 */
const validateShowDataset = createLogic({
    type: ProjectActionCreator.ACTIONS.SHOW_DATASET_DETAIL,
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
    type: ProjectActionCreator.ACTIONS.SELECT_ENTRIES,
    validate({ getState, action }, allow, reject) {
        const entryIds = action.payload;
        const state = getState();
        const currentIds = ProjectSelector.getSelectedEntryIds(state);
        const allEntries = ProjectSelector.getAllEntries(state);

        if (entryIds) {
            // check if elected entry is in Store
            for (let i = 0; i < entryIds.length; i++) {
                const entry = allEntries[entryIds[i]];
                if (entry === undefined) {
                    reject();
                    return;
                }
            }
        }

        if (currentIds && currentIds.length > 0) {
            if (entryIds === null) {
                allow(Object.assign({}, action, {payload: []}));
            } else {
                let ids = sortNumArrayAsc(entryIds.concat(currentIds));
                for (let i = 0; i < ids.length; ++i) {
                    for (let j = i + 1; j < ids.length; ++j) {
                        if (ids[i] === ids[j]) {
                            ids.splice(j--, 1);
                        }
                    }
                }

                if (currentIds.length !== ids.length) {
                    allow(ProjectActionCreator.createSelectEntryAction(ids));
                } else {
                    reject();
                }
            }
        } else {
            allow(ProjectActionCreator.createSelectEntryAction(sortNumArrayAsc(entryIds)));
        }
    }
});

/**
 * Validates new sampling.
 * Prevents saving invalid sampling.
 */
const validateNewSampling = createLogic({
    type: ProjectActionCreator.ACTIONS.SET_SAMPLING,
    validate({ getState, action }, allow, reject) {
        const samplingWindow = ProjectSelector.getSamplingWindow(getState());
        const newSamplingWindow = Object.assign({}, samplingWindow, action.payload);

        if (newSamplingWindow.size < 4
            || newSamplingWindow.start < 0
            || newSamplingWindow.fixedCount <= 0) {
            reject();
        } else {
            allow(Object.assign({}, action, {payload: newSamplingWindow}));
        }
    }
});

/**
 * Samples streams (if needed) after sampling has changed or a dataset was updated.
 */
const sampleStreams = createLogic({
    type: [
        ProjectActionCreator.ACTIONS.SET_SAMPLING,
        ProjectActionCreator.ACTIONS.UPDATE_DATASET,
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

        const datasets = ProjectSelector.getAllDatasets(state);

        const entries = {};
        let entryId = 1;
        const limitCount = ProjectSelector.getType(state) === PROJECT_TYPE.ONLINE_PCA;

        let promise = Promise.resolve();
        for (let i = 0; i < datasets.length; i++) {
            const dataset = datasets[i];
            const stream = ProjectSelector.getDatasetTransformedStream(state, dataset.id);

            promise = promise.then(() => {
                return StreamUtil.sampleStreamEntries(dataset.id, entries, entryId, stream, samplingWindow, limitCount)
                    .then((latestId) => {
                        entryId = latestId;
                    })
            });
        }

        promise.then(() => {
            dispatch(ProjectActionCreator.createSetSampledEntriesAction(entries));
            done();
        });
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
