const { BrowserWindow } = require('electron').remote;
const { ipcRenderer } = require('electron');


const WorkerTasks = {
    CALCULATE_PCA: 'calculate-pca',
};

function workerTaskEnded(name) {
    return `${name}-done`;
}

function workerTaskProgress(name) {
    return `${name}-progress`;
}

function execByWorker(key, arg, progressCallback=null) {
    return new Promise(function (resolve, reject) {
        const window = BrowserWindow.getFocusedWindow();
        const workerWindow = window.getChildWindows()[0];

        workerWindow.webContents.send(key, arg, window.id);

        ipcRenderer.on(workerTaskEnded(key), function (event, input, output, err) {
            if (err) {
                reject(Error(err)); // Error cannot be passed from another process, so wrap it to new one
            } else {
                resolve(output);
            }
            ipcRenderer.removeAllListeners(workerTaskEnded(key));
            ipcRenderer.removeAllListeners(workerTaskProgress(key));
        });

        if (progressCallback) {
            ipcRenderer.on(workerTaskProgress(key), function (event, input, progress) {
                progressCallback(progress);
            });
        }
    });
}

module.exports = {
    WorkerTasks,
    workerTaskProgress,
    workerTaskEnded,
    execByWorker
};
