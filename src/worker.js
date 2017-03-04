const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;

const { WorkerTaskNames, WorkerUtil } = require('./util/WorkerUtil');
const PcaUtil = require('./util/PcaUtil');


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
        const pca = PcaUtil.calculatePcaSync(datasets);
        sendEnd(callerId, WorkerTaskNames.CALCULATE_PCA, datasetsJson, pca, null);
    } catch (error) {
        sendEnd(callerId, WorkerTaskNames.CALCULATE_PCA, datasetsJson, null, error);
    }
});

