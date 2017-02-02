"use strict";

const {replace} = require('react-router-redux');
const fs = require('fs');
const path = require('path');

const { createAction } = require('./index');
const DialogService = require('../service/DialogService');
const { WorkerTasks, execByWorker } = require('../service/WorkerService');
const { readFromFile, writeToFile } = require('../service/FileService');


const PROJECT_FILE = 'project.json';

const Actions = {
    SELECT_PROJECT: 'SELECT_PROJECT',
    SET_PROJECT: 'SET_PROJECT',
    NEW_DATASET: 'NEW_DATASET',
    UPDATE_DATASET: 'UPDATE_DATASET',
    DELETE_DATASET: 'DELETE_DATASET',
    SHOW_DATASET_DETAIL: 'SHOW_DATASET_DETAIL',
    SHOW_PROJECT_ERROR: 'SHOW_PROJECT_ERROR',
    SELECT_ENTRY: 'SELECT_ENTRY',
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

function createUpdateDatasetAction(datasetId, changes) {
    return createAction(Actions.UPDATE_DATASET, {id: datasetId, changes});
}

function createShowDatasetDetailAction(datasetId) {
    return createAction(Actions.SHOW_DATASET_DETAIL, datasetId);
}

function createDeleteDatasetAction(datasetId) {
    return createAction(Actions.DELETE_DATASET, datasetId);
}

function createSelectEntryAction(datasetId, entryIds) {
    return createAction(Actions.SELECT_ENTRY, {datasetId: datasetId, entryIds: entryIds});
}

//endregion Action Creators

//region Action Dispatchers

/**
 * Creates a new project.
 * @returns {Function}
 */
function startNewProject() {
    return function (dispatch, getState) {
        DialogService.showOpenCreateDirDialog()
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
        DialogService.showOpenDirDialog()
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
 * Updates dataset with given ID.
 * @param datasetId Dataset ID.
 * @param changes Changes made on the dataset and it's entries.
 * @returns {Function}
 */
function updateDataset(datasetId, changes) {
    return function (dispatch, getState) {
        return dispatch(createUpdateDatasetAction(datasetId, changes));
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
    }
}

/**
 * Selects an entry.
 * @param datasetId A dataset ID.
 * @param entryId An entry ID.
 * @returns {Function}
 */
function selectEntry(datasetId, entryId) {
    return function (dispatch, getState) {
        dispatch(createSelectEntryAction(datasetId, [entryId]));
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
    updateDataset,
    showDatasetDetail,
    closeDatasetDetail,
    closeAndDeleteDataset,
    selectEntry,
};
