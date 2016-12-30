const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;

const { WorkerTasks, workerTaskProgress, workerTaskEnded } = require('./service/WorkerService');
const { readFromFile } = require('./service/EntryService');


function sendEnd(callerId, task, inArg, result, error) {
    const fromWindow = BrowserWindow.fromId(callerId);
    fromWindow.webContents.send(workerTaskEnded(task), inArg, result, error);
}

ipcRenderer.on(WorkerTasks.LOAD_ENTRY_FILE, function (event, filePath, callerId) {
    readFromFile(filePath)
        .then((result) => {
            sendEnd(callerId, WorkerTasks.LOAD_ENTRY_FILE, filePath, result, null);
        })
        .catch((err) => {
            sendEnd(callerId, WorkerTasks.LOAD_ENTRY_FILE, filePath, null, err);
        });

});
