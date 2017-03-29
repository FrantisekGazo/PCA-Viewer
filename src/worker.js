const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;

const { WorkerTaskNames, WorkerUtil } = require('./util/WorkerUtil');
const CalculationUtil = require('./util/CalculationUtil');
const FileUtil = require('./util/FileUtil');


function sendEnd(callerId, task, inArg, result, error) {
    if (error) {
        console.error('ERROR', error);
    }

    const fromWindow = BrowserWindow.fromId(callerId);
    fromWindow.webContents.send(WorkerUtil.workerTaskEnded(task), inArg, result, error);
}

/* Executes the PCA calculation in the Worker process */
ipcRenderer.on(WorkerTaskNames.CALCULATE_PCA, function (event, datasetsJson, callerId) {
    try {
        const datasets = JSON.parse(datasetsJson);
        const pca = CalculationUtil.calculatePcaSync(datasets);
        sendEnd(callerId, WorkerTaskNames.CALCULATE_PCA, datasetsJson, pca, null);
    } catch (error) {
        sendEnd(callerId, WorkerTaskNames.CALCULATE_PCA, datasetsJson, null, error);
    }
});

/* Executes the area calculation in the Worker process */
ipcRenderer.on(WorkerTaskNames.CALCULATE_AREAS, function (event, argJson, callerId) {
    try {
        const arg = JSON.parse(argJson);
        const areas = CalculationUtil.calculateAreasSync(arg);
        sendEnd(callerId, WorkerTaskNames.CALCULATE_AREAS, argJson, areas, null);
    } catch (error) {
        sendEnd(callerId, WorkerTaskNames.CALCULATE_AREAS, argJson, null, error);
    }
});

/* Read file content in the Worker process */
ipcRenderer.on(WorkerTaskNames.READ_FILE, function (event, argJson, callerId) {
    const filePath = JSON.parse(argJson);
    FileUtil.readTextFromFileSync(filePath)
        .then((content) => {
            sendEnd(callerId, WorkerTaskNames.READ_FILE, argJson, content, null);
        })
        .catch((error) => {
            sendEnd(callerId, WorkerTaskNames.READ_FILE, argJson, null, error);
        });
});

