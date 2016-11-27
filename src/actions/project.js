"use strict";

const {replace} = require('react-router-redux');

const {createAction} = require('./index');
const {showOpenCreateDirDialog, showOpenDirDialog, showOpenFileDialog} = require('../service/DialogService');
const {WorkerTasks, execByWorker} = require('../service/WorkerService');


const Actions = {
    SELECT_PROJECT: 'SELECT_PROJECT',
    SHOW_PROJECT_ERROR: 'SHOW_PROJECT_ERROR',
};

function selectProject(dir) {
    return function (dispatch) {
        dispatch(createAction(Actions.SELECT_PROJECT, dir));

        const location = {pathname: `/project/data/`};
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

function addData() {
    return function (dispatch) {
        showOpenFileDialog()
            .then((filePath) => {
                return execByWorker(WorkerTasks.LOAD_DATA_FILE, filePath)
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
    addData
};
