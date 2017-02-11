"use strict";

const {replace} = require('react-router-redux');
const fs = require('fs');
const path = require('path');

const { createAction } = require('./index');
const DialogService = require('../service/DialogService');
const { sortNumArrayAsc } = require('../util/util');
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
    SELECT_ENTRIES: 'SELECT_ENTRIES',
};

//region Action Creators
// these action creators are private and called only internally by action dispatchers

function createGoToStartScreenAction() {
    return replace({pathname: `/`});
}

function createGoToSetupScreenAction() {
    return replace({pathname: `/setup/`});
}

function createGoToProjectScreenAction() {
    return replace({pathname: `/project/`});
}

function createSelectProjectAction(params) {
    return createAction(Actions.SELECT_PROJECT, params);
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
    return createAction(Actions.UPDATE_DATASET, {datasetId, changes});
}

function createShowDatasetDetailAction(datasetId) {
    return createAction(Actions.SHOW_DATASET_DETAIL, datasetId);
}

function createDeleteDatasetAction(datasetId) {
    return createAction(Actions.DELETE_DATASET, datasetId);
}

function createSelectEntryAction(entryIds) {
    return createAction(Actions.SELECT_ENTRIES, entryIds);
}

//endregion Action Creators

//region Action Dispatchers

/**
 * Navigates to setup screen, where user can setup a new project.
 * @returns {Function}
 */
function setupNewProject() {
    return function (dispatch, getState) {
        dispatch(createGoToSetupScreenAction());
    }
}

/**
 * Navigates back to start screen.
 * @returns {Function}
 */
function goBackFromSetup() {
    return function (dispatch, getState) {
        dispatch(createGoToStartScreenAction());
    }
}

/**
 * Creates a new project and navigates to the project screen.
 * @returns {Function}
 */
function startNewProject(params) {
    return function (dispatch, getState) {
        dispatch(createSelectProjectAction(params));
        dispatch(createGoToProjectScreenAction());
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
                        project.path = dir;
                        project.detailDatasetId = null; // do not show detail after opening a project

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
        dispatch(createGoToStartScreenAction());
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
 * Selects entries.
 * @param entryIds Entry IDs.
 * @returns {Function}
 */
function selectEntries(entryIds) {
    return function (dispatch, getState) {
        const currentIds = getState().project.detailEntryIds;

        if (currentIds && currentIds.length > 0) {
            let ids = sortNumArrayAsc(entryIds.concat(currentIds));
            for (let i = 0; i < ids.length; ++i) {
                for (let j = i + 1; j < ids.length; ++j) {
                    if (ids[i] === ids[j]) {
                        ids.splice(j--, 1);
                    }
                }
            }

            if (currentIds.length !== ids.length) {
                dispatch(createSelectEntryAction(ids));
            }
        } else {
            dispatch(createSelectEntryAction(entryIds));
        }
    }
}

/**
 * Clears all selected entries.
 * @returns {Function}
 */
function clearSelectedEntries() {
    return function (dispatch, getState) {
        dispatch(createSelectEntryAction([]));
    }
}

//endregion Action Dispatchers

module.exports = {
    Actions,
    setupNewProject,
    goBackFromSetup,
    startNewProject,
    openExistingProject,
    saveProject,
    closeProject,
    addDataset,
    updateDataset,
    showDatasetDetail,
    closeDatasetDetail,
    closeAndDeleteDataset,
    selectEntries,
    clearSelectedEntries,
};
