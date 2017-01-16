"use strict";

const { replace } = require('react-router-redux');
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

//endregion Action Creators

//region Action Dispatchers

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

function saveProject() {
    return function (dispatch, getState) {
        const state = getState();

        const filePath = path.join(state.project.path, PROJECT_FILE);
        const json = JSON.stringify(state.project);

        return writeToFile(filePath, json);
    }
}

function closeProject() {
    return function (dispatch, getState) {
        const location = {pathname: `/`};
        dispatch(replace(location));

        dispatch(createSelectProjectAction(null));
    }
}

function addDataset() {
    return function (dispatch, getState) {
        dispatch(createAddDatasetAction());
    }
}

function showDatasetDetail(datasetId) {
    return function (dispatch, getState) {
        if (getState().project.detail !== datasetId) {
            dispatch(createShowDatasetDetailAction(datasetId));
        }
    }
}

function closeDatasetDetail(datasetId) {
    return function (dispatch, getState) {
        dispatch(createShowDatasetDetailAction(null));
    }
}

function closeAndDeleteDataset(datasetId) {
    return function (dispatch, getState) {
        dispatch(createShowDatasetDetailAction(null));
        dispatch(createDeleteDatasetAction(datasetId));
    }
}

function loadEntries(datasetId) {
    return function (dispatch, getState) {
        showOpenFileDialog()
            .then((filePath) => {
                return execByWorker(WorkerTasks.LOAD_VALUES_FROM_FILE, filePath)
            })
            .then((values) => {
                dispatch(createAddEntriesAction(datasetId, values));
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
