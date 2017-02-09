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

ipcRenderer.on(WorkerTasks.CALCULATE_PCA, function (event, datasets, callerId) {
    try {
        const pca = PcaService.calculatePcaSync(datasets);
        sendEnd(callerId, WorkerTasks.CALCULATE_PCA, datasets, pca, null);
    } catch (error) {
        sendEnd(callerId, WorkerTasks.CALCULATE_PCA, datasets, null, error);
    }
});

