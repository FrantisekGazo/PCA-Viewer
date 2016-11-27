const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;

const { WorkerTasks, workerTaskProgress, workerTaskEnded } = require('./service/WorkerService');


ipcRenderer.on(WorkerTasks.LOAD_DATA_FILE, function (event, filePath, callerId) {
    const fromWindow = BrowserWindow.fromId(callerId);

    fromWindow.webContents.send(workerTaskEnded(WorkerTasks.LOAD_DATA_FILE), filePath, 'FAKE DATA', null);
});
