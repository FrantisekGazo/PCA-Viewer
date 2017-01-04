"use strict";

const { replace } = require('react-router-redux');

const { createAction } = require('./index');
const { showOpenCreateDirDialog, showOpenDirDialog, showOpenFileDialog } = require('../service/DialogService');
const { WorkerTasks, execByWorker } = require('../service/WorkerService');


const Actions = {
    SELECT_PROJECT: 'SELECT_PROJECT',
    NEW_DATASET: 'NEW_DATASET',
    DELETE_DATASET: 'DELETE_DATASET',
    SHOW_DATASET_DETAIL: 'SHOW_DATASET_DETAIL',
    SHOW_PROJECT_ERROR: 'SHOW_PROJECT_ERROR',
    ADD_ENTRIES: 'ADD_ENTRIES',
};

function selectProject(dir) {
    return function (dispatch) {
        dispatch(createAction(Actions.SELECT_PROJECT, dir));

        const location = {pathname: `/project/`};
        dispatch(replace(location));
    }
}

function showProjectSelectionError(msg) {
    return createAction(Actions.SHOW_PROJECT_ERROR, msg);
}

function saveProject() {
    return function (dispatch) {
        console.log("TODO : SAVE");
    }
}

function closeProject() {
    return function (dispatch) {
        const location = {pathname: `/`};
        dispatch(replace(location));

        dispatch(createAction(Actions.SELECT_PROJECT, null));
    }
}

function startNewProject() {
    return function (dispatch) {
        showOpenCreateDirDialog()
            .then((dir) => {
                dispatch(selectProject(dir));
            })
            .catch((err) => {
                dispatch(showProjectSelectionError(err.message));
            });
    }
}

function openExistingProject() {
    return function (dispatch) {
        showOpenDirDialog()
            .then((dir) => {
                dispatch(selectProject(dir));
            })
            .catch((err) => {
                dispatch(showProjectSelectionError(err.message));
            });
    }
}

function addDataset() {
    return createAction(Actions.NEW_DATASET);
}

function showDatasetDetail(datasetId) {
    return function (dispatch, getState) {
        if (getState().project.detail !== datasetId) {
            dispatch(createAction(Actions.SHOW_DATASET_DETAIL, datasetId));
        }
    }
}

function closeDatasetDetail(datasetId) {
    return createAction(Actions.SHOW_DATASET_DETAIL, null);
}

function deleteDataset(datasetId) {
    return createAction(Actions.DELETE_DATASET, datasetId);
}

function closeAndDeleteDataset(datasetId) {
    return function (dispatch) {
        dispatch(closeDatasetDetail(datasetId));
        dispatch(deleteDataset(datasetId));
    }
}

function addEntries(datasetId, values) {
    return createAction(Actions.ADD_ENTRIES, {datasetId, values});
}

function loadEntries(datasetId) {
    return function (dispatch) {
        showOpenFileDialog()
            .then((filePath) => {
                return execByWorker(WorkerTasks.LOAD_VALUES_FROM_FILE, filePath)
            })
            .then((values) => {
                dispatch(addEntries(datasetId, values));
            })
            .catch((err) => {
                console.log('RECEIVED ERROR: ', err);
            });
    }
}


module.exports = {
    Actions,
    startNewProject,
    openExistingProject,
    closeProject,
    addDataset,
    loadEntries,
    showDatasetDetail,
    closeDatasetDetail,
    closeAndDeleteDataset,
    saveProject,
};
