const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;

const { WorkerTasks, workerTaskProgress, workerTaskEnded } = require('./service/WorkerService');
const { readValuesFromFile } = require('./service/FileService');


function sendEnd(callerId, task, inArg, result, error) {
    const fromWindow = BrowserWindow.fromId(callerId);
    fromWindow.webContents.send(workerTaskEnded(task), inArg, result, error);
}

ipcRenderer.on(WorkerTasks.LOAD_VALUES_FROM_FILE, function (event, filePath, callerId) {
    readValuesFromFile(filePath)
        .then((result) => {
            sendEnd(callerId, WorkerTasks.LOAD_VALUES_FROM_FILE, filePath, result, null);
        })
        .catch((err) => {
            sendEnd(callerId, WorkerTasks.LOAD_VALUES_FROM_FILE, filePath, null, err);
        });

});
