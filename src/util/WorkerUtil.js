"use strict";

const { BrowserWindow } = require('electron').remote;
const { ipcRenderer } = require('electron');


/**
 * IDs of main and worker renderer process.
 * @type {{MAIN: number, WORKER: number}}
 */
const WINDOW_IDS = {
    MAIN: 0,
    WORKER: 0,
};

const WINDOW_SET_ACTION_KEYS = {
    MAIN: 'set-main-window-id',
    WORKER: 'set-worker-window-id',
};

/**
 * Starts listening for changes in IDs of main and worker renderer process.
 */
function startListeningForWindowIds() {
    ipcRenderer.on(WINDOW_SET_ACTION_KEYS.MAIN, function (event, input, output, err) {
        WINDOW_IDS.MAIN = input;
        console.log(WINDOW_SET_ACTION_KEYS.MAIN, event, input, output, err);
    });
    ipcRenderer.on(WINDOW_SET_ACTION_KEYS.WORKER, function (event, input, output, err) {
        WINDOW_IDS.WORKER = input;
        console.log(WINDOW_SET_ACTION_KEYS.WORKER, event, input, output, err);
    });
}

/**
 * Names of all supported tasks.
 * @type {{CALCULATE_PCA: string}}
 */
const WorkerTaskNames = {
    CALCULATE_PCA: 'calculate-pca',
    CALCULATE_AREAS: 'calculate-areas',
    READ_FILE: 'read-file',
};


/**
 * Provides methods for worker execution.
 */
class WorkerUtil {

    /**
     * Creates a key for task end.
     * @param name taks name
     * @returns {string}
     */
    static workerTaskEnded(name) {
        return `${name}-done`;
    }

    /**
     * Creates a key for task progress.
     * @param name taks name
     * @returns {string}
     */
    static workerTaskProgress(name) {
        return `${name}-progress`;
    }

    /**
     * Executes task with given name in a worker process.
     * @param taskName Task name
     * @param arg Arguments for the task that will be executed
     * @param progressCallback Callback function for progress notification
     * @returns {Promise}
     */
    static execByWorker(taskName, arg, progressCallback=null) {
        return new Promise(function (resolve, reject) {
            const mainWindow = BrowserWindow.fromId(WINDOW_IDS.MAIN);
            const workerWindow = BrowserWindow.fromId(WINDOW_IDS.WORKER);

            ipcRenderer.on(WorkerUtil.workerTaskEnded(taskName), function (event, input, output, err) {
                if (err) {
                    reject(Error(err)); // Error cannot be passed from another process, so wrap it to new one
                } else {
                    resolve(output);
                }
                ipcRenderer.removeAllListeners(WorkerUtil.workerTaskEnded(taskName));
                ipcRenderer.removeAllListeners(WorkerUtil.workerTaskProgress(taskName));
            });

            if (progressCallback) {
                ipcRenderer.on(WorkerUtil.workerTaskProgress(taskName), function (event, input, progress) {
                    progressCallback(progress);
                });
            }

            const argJson = JSON.stringify(arg);
            workerWindow.webContents.send(taskName, argJson, mainWindow.id);
        });
    }
}

module.exports = {
    startListeningForWindowIds,
    WorkerTaskNames,
    WorkerUtil
};
