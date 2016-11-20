const ipc = require('electron').ipcRenderer;
const BrowserWindow = require('electron').remote.BrowserWindow;

const {WorkerTasks, workerTaskProgress, workerTaskEnded} = require('./service/worker');


ipc.on(WorkerTasks.TEST, function (event, text, callerId) {
    const fromWindow = BrowserWindow.fromId(callerId);

    const modifiedText = `${text.toUpperCase()} (changed by worker)`;
    fromWindow.webContents.send(workerTaskEnded(WorkerTasks.TEST), text, modifiedText, null);
});
