"use strict";

const { remote } = require('electron');


/**
 * Provides methods for file and directory selection.
 */
class DialogUtil {

    /**
     * Opens dialog for directory selection, where user can also create new directory.
     * @returns {Promise}
     */
    static showOpenCreateDirDialog() {
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

    /**
     * Opens dialog for directory selection.
     * @returns {Promise}
     */
    static showOpenDirDialog() {
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

    /**
     * Opens dialog for file selection.
     * @returns {Promise}
     */
    static showOpenFileDialog() {
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
}

module.exports = DialogUtil;
