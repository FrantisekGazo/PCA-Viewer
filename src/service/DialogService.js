"use strict";

const {remote} = require('electron');


const showOpenCreateDirDialog = () => {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
        remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            properties: ['createDirectory', 'openDirectory']
        }, (dirPaths) => {
            if (dirPaths && dirPaths[0]) {
                const outDirPath = dirPaths[0];
                resolve(outDirPath);
            } else {
                reject(Error('Nothing selected'));
            }
        });
    });
};

const showOpenDirDialog = () => {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
        remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            properties: ['openDirectory']
        }, (dirPaths) => {
            if (dirPaths && dirPaths[0]) {
                const outDirPath = dirPaths[0];
                resolve(outDirPath);
            } else {
                reject(Error('Nothing selected'));
            }
        });
    });
};

const showOpenFileDialog = () => {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
        remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            properties: ['openFile']
        }, (filePaths) => {
            if (filePaths && filePaths[0]) {
                const filePath = filePaths[0];
                resolve(filePath);
            } else {
                reject(Error('Nothing selected'));
            }
        });
    });
};

module.exports = {
    showOpenCreateDirDialog,
    showOpenDirDialog,
    showOpenFileDialog
};
