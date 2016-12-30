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

function closeProject() {
    return selectProject(null);
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

function addEntries() {
    return function (dispatch) {
        showOpenFileDialog()
            .then((filePath) => {
                return execByWorker(WorkerTasks.LOAD_ENTRY_FILE, filePath)
            })
            .then((data) => {
                console.log('RECEIVED DATA: ', data);
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
    addEntries,
    showDatasetDetail,
    closeDatasetDetail,
    closeAndDeleteDataset
};
