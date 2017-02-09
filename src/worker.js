const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;

const { WorkerTasks, workerTaskProgress, workerTaskEnded } = require('./service/WorkerService');
const PcaService = require('./service/PcaService');


function sendEnd(callerId, task, inArg, result, error) {
    if (error) {
        console.error('ERROR', error);
    }

    const fromWindow = BrowserWindow.fromId(callerId);
    fromWindow.webContents.send(workerTaskEnded(task), inArg, result, error);
}

ipcRenderer.on(WorkerTasks.CALCULATE_PCA, function (event, datasetsJson, callerId) {
    try {
        const datasets = JSON.parse(datasetsJson);
        const pca = PcaService.calculatePcaSync(datasets);
        sendEnd(callerId, WorkerTasks.CALCULATE_PCA, datasetsJson, pca, null);
    } catch (error) {
        sendEnd(callerId, WorkerTasks.CALCULATE_PCA, datasetsJson, null, error);
    }
});

