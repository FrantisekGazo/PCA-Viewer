"use strict";

const {replace} = require('react-router-redux');
const fs = require('fs');
const path = require('path');

const { createAction } = require('./index');
const { showOpenCreateDirDialog, showOpenDirDialog, showOpenFileDialog } = require('../service/DialogService');
const { WorkerTasks, execByWorker } = require('../service/WorkerService');
const { readFromFile, writeToFile } = require('../service/FileService');


const PROJECT_FILE = 'project.json';

const Actions = {
    SELECT_PROJECT: 'SELECT_PROJECT',
    SET_PROJECT: 'SET_PROJECT',
    NEW_DATASET: 'NEW_DATASET',
    DELETE_DATASET: 'DELETE_DATASET',
    SHOW_DATASET_DETAIL: 'SHOW_DATASET_DETAIL',
    SHOW_PROJECT_ERROR: 'SHOW_PROJECT_ERROR',
    ADD_ENTRIES: 'ADD_ENTRIES',
    PCA_PENDING: 'PCA_PENDING',
    PCA_READY: 'PCA_READY',
};

//region Action Creators
// these action creators are private and called only internally by action dispatchers

function createGoToProjectScreenAction() {
    return replace({pathname: `/project/`});
}

function createSelectProjectAction(projectDir) {
    return createAction(Actions.SELECT_PROJECT, projectDir);
}

function createProjectErrorAction(errorMessage) {
    return createAction(Actions.SHOW_PROJECT_ERROR, errorMessage);
}

function createSetProjectAction(projectStoreObject) {
    return createAction(Actions.SET_PROJECT, projectStoreObject);
}

function createAddDatasetAction() {
    return createAction(Actions.NEW_DATASET);
}

function createShowDatasetDetailAction(datasetId) {
    return createAction(Actions.SHOW_DATASET_DETAIL, datasetId);
}

function createDeleteDatasetAction(datasetId) {
    return createAction(Actions.DELETE_DATASET, datasetId);
}

function createAddEntriesAction(datasetId, values) {
    return createAction(Actions.ADD_ENTRIES, {datasetId, values});
}

function createPcaPendingAction() {
    return createAction(Actions.PCA_PENDING);
}

function createPcaReadyAction(pca) {
    return createAction(Actions.PCA_READY, pca);
}

//endregion Action Creators

//region Action Dispatchers

/**
 * Creates a new project.
 * @returns {Function}
 */
function startNewProject() {
    return function (dispatch, getState) {
        showOpenCreateDirDialog()
            .then((dir) => {
                dispatch(createSelectProjectAction(dir));
                dispatch(createGoToProjectScreenAction());
            })
            .catch((err) => {
                dispatch(createProjectErrorAction(err.message));
            });
    }
}

/**
 * Opens an existing project.
 * @returns {Function}
 */
function openExistingProject() {
    return function (dispatch, getState) {
        showOpenDirDialog()
            .then((dir) => {
                const filePath = path.join(dir, PROJECT_FILE);
                if (!fs.existsSync(filePath)) {
                    throw Error('Selected directory is not a PCA project');
                }

                return readFromFile(filePath)
                    .then((data) => {
                        const project = JSON.parse(data);
                        project['path'] = dir;

                        dispatch(createSetProjectAction(project));
                        dispatch(createGoToProjectScreenAction());
                    });
            })
            .catch((err) => {
                dispatch(createProjectErrorAction(err.message));
            });
    }
}

/**
 * Saves the open project to a file.
 * @returns {Function}
 */
function saveProject() {
    return function (dispatch, getState) {
        const state = getState();

        const filePath = path.join(state.project.path, PROJECT_FILE);
        const json = JSON.stringify(state.project);

        return writeToFile(filePath, json);
    }
}

/**
 * Closes the open project.
 * @returns {Function}
 */
function closeProject() {
    return function (dispatch, getState) {
        const location = {pathname: `/`};
        dispatch(replace(location));

        dispatch(createSelectProjectAction(null));
    }
}

/**
 * Creates new empty dataset.
 * @returns {Function}
 */
function addDataset() {
    return function (dispatch, getState) {
        dispatch(createAddDatasetAction());
    }
}

/**
 * Shows a detail of dataset with given ID.
 * @param datasetId A dataset ID.
 * @returns {Function}
 */
function showDatasetDetail(datasetId) {
    return function (dispatch, getState) {
        if (getState().project.detail !== datasetId) {
            dispatch(createShowDatasetDetailAction(datasetId));
        }
    }
}

/**
 * Closes a detail of dataset with given ID.
 * @param datasetId A dataset ID.
 * @returns {Function}
 */
function closeDatasetDetail(datasetId) {
    return function (dispatch, getState) {
        dispatch(createShowDatasetDetailAction(null));
    }
}

/**
 * Closes a detail and deletes dataset with given ID.
 * @param datasetId A dataset ID.
 * @returns {Function}
 */
function closeAndDeleteDataset(datasetId) {
    return function (dispatch, getState) {
        dispatch(createShowDatasetDetailAction(null));
        dispatch(createDeleteDatasetAction(datasetId));

        dispatch(createPcaPendingAction());
        return execByWorker(WorkerTasks.CALCULATE_PCA, getState())
            .then((pca) => {
                dispatch(createPcaReadyAction(pca));
            });
    }
}

/**
 * Loads entries from a file to dataset with given ID.
 * @param datasetId A dataset ID
 * @returns {Function}
 */
function loadEntries(datasetId) {
    return function (dispatch, getState) {
        showOpenFileDialog()
            .then((filePath) => {
                return execByWorker(WorkerTasks.LOAD_VALUES_FROM_FILE, filePath)
            })
            .then((values) => {
                dispatch(createAddEntriesAction(datasetId, values));

                // recalculate PCA if values were not empty
                if (values.length > 0) {
                    dispatch(createPcaPendingAction());
                    return execByWorker(WorkerTasks.CALCULATE_PCA, getState())
                        .then((pca) => {
                            dispatch(createPcaReadyAction(pca));
                        });
                } else {
                    return Promise.resolve();
                }
            })
            .catch((err) => {
                console.log('RECEIVED ERROR: ', err);
            });
    }
}

//endregion Action Dispatchers

module.exports = {
    Actions,
    startNewProject,
    openExistingProject,
    saveProject,
    closeProject,
    addDataset,
    showDatasetDetail,
    closeDatasetDetail,
    closeAndDeleteDataset,
    loadEntries,
};
