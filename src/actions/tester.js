"use strict";

const {createAction} = require('./index');
const {showOpenCreateDirDialog} = require('../service/DialogService');
const {WorkerTasks, execByWorker} = require('../service/WorkerService');


const Actions = {
    SHOW_TEXT: 'SHOW_TEXT',
    SHOW_ERROR: 'SHOW_ERROR',
};

function showText(text) {
    return createAction(Actions.SHOW_TEXT, text);
}

function showError(msg) {
    return createAction(Actions.SHOW_ERROR, msg);
}

function testDialog() {
    return (dispatch, getState) => {
        return showOpenCreateDirDialog()
            .then((dirPath) => {
                dispatch(showText(`Selected dir: ${dirPath}`));
            })
            .catch((err) => {
                dispatch(showError(err.message));
            });
    }
}

function testWorker(text) {
    return (dispatch, getState) => {
        return execByWorker(WorkerTasks.TEST, text)
            .then((modifiedText) => {
                dispatch(showText(modifiedText))
            })
            .catch((err) => {
                dispatch(showError(err.message))
            });
    }
}


module.exports = {
    Actions,
    testDialog,
    testWorker
};
