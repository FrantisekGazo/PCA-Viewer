"use strict";

const {createAction} = require('./index');
const {showSaveDirDialog} = require('../service/dialog');
const {WorkerTasks, execByWorker} = require('../service/worker');


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
        return showSaveDirDialog()
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
