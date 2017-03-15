const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;

const { WorkerTaskNames, WorkerUtil } = require('./util/WorkerUtil');
const CalculationUtil = require('./util/CalculationUtil');


function sendEnd(callerId, task, inArg, result, error) {
    if (error) {
        console.error('ERROR', error);
    }

    const fromWindow = BrowserWindow.fromId(callerId);
    fromWindow.webContents.send(WorkerUtil.workerTaskEnded(task), inArg, result, error);
}

ipcRenderer.on(WorkerTaskNames.CALCULATE_PCA, function (event, datasetsJson, callerId) {
    try {
        const datasets = JSON.parse(datasetsJson);
        const pca = CalculationUtil.calculatePcaSync(datasets);
        sendEnd(callerId, WorkerTaskNames.CALCULATE_PCA, datasetsJson, pca, null);
    } catch (error) {
        sendEnd(callerId, WorkerTaskNames.CALCULATE_PCA, datasetsJson, null, error);
    }
});

ipcRenderer.on(WorkerTaskNames.CALCULATE_AREAS, function (event, argJson, callerId) {
    try {
        const arg = JSON.parse(argJson);
        const areas = CalculationUtil.calculateAreasSync(arg);
        sendEnd(callerId, WorkerTaskNames.CALCULATE_AREAS, argJson, areas, null);
    } catch (error) {
        sendEnd(callerId, WorkerTaskNames.CALCULATE_AREAS, argJson, null, error);
    }
});

