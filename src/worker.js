const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;

const { WorkerTasks, workerTaskProgress, workerTaskEnded } = require('./service/WorkerService');


ipcRenderer.on(WorkerTasks.LOAD_ENTRY_FILE, function (event, filePath, callerId) {
    const fromWindow = BrowserWindow.fromId(callerId);

    fromWindow.webContents.send(workerTaskEnded(WorkerTasks.LOAD_ENTRY_FILE), filePath, 'FAKE DATA', null);
});
