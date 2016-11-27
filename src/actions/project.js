"use strict";

const { createAction } = require('./index');
const { showOpenDirDialog, showOpenCreateDirDialog } = require('../service/DialogService');
const { replace } = require('react-router-redux');


const Actions = {
    SELECT_PROJECT: 'SELECT_PROJECT',
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

module.exports = {
    Actions,
    startNewProject,
    openExistingProject,
    closeProject
};
