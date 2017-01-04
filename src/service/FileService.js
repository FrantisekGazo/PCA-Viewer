"use strict";

const readline = require('readline');
const fs = require('fs');


/**
 * Reads the given file and returns read values. Each value is an array of decimal numbers.
 * @param filePath Path to the file that will be read.
 * @returns {Promise}
 */
function readValuesFromFile(filePath) {
    return new Promise(function (resolve, reject) {
        const values = [];

        const rl = readline.createInterface({
            input: fs.createReadStream(filePath)
        });

        rl.on('line', function (line) {
            const value = line.split(' ').map(stringValue => parseFloat(stringValue));
            values.push(value);
        });

        rl.on('close', function () {
            resolve(values);
        });
    });
}

/**
 * Writes given text to a file on given path.
 * @returns {Promise}
 */
function writeToFile(filePath, text) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filePath, text, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    readValuesFromFile,
    writeToFile,
};
