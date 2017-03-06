"use strict";

const path = require('path');
const execFile = require('child_process').execFile;


/**
 * Absolute path to the script directory. This must be set by process js file.
 * @type {string}
 */
let SCRIPT_DIRECTORY = '';

/**
 * Supported scripts
 */
const SCRIPTS = {
    PCA: 'pca',
};


/**
 * Provides simple methods for running commands and scripts in different programming languages.
 */
class CmdUtil {

    /**
     * Sets path to script base directory.
     * @param dirPath {string} Path to the directory
     */
    static setScriptDirectory(dirPath) {
        console.log('Setting script directory:', dirPath);
        SCRIPT_DIRECTORY = dirPath;
    }

    /**
     * Executes script for PCA calculation.
     * @param args Script arguments
     * @returns {Promise}
     */
    static executePcaScript(args) {
        return CmdUtil._executeScript(SCRIPTS.PCA, args);
    }

    /**
     * Executes script on given path with given arguments.
     * @param scriptRelativePath Relative path to the script
     * @param args Script arguments
     * @returns {Promise}
     * @private
     */
    static _executeScript(scriptRelativePath, args) {
        return new Promise(function (resolve, reject) {
            const command = CmdUtil._getScriptAbsPath(scriptRelativePath);

            execFile(command, args, function (error, stdout, stderr) {
                if (error) {
                    console.error(stderr);
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        });
    }

    /**
     * Creates absolute for given relative path the script.
     * @param relativePath Relative path to the script
     * @returns {string}
     * @private
     */
    static _getScriptAbsPath(relativePath) {
        return path.join(SCRIPT_DIRECTORY, relativePath);
    }
}

module.exports = CmdUtil;
