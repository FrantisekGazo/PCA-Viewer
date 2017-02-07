"use strict";

const readline = require('readline');
const fs = require('fs');


/**
 * Reads the given file and returns read values. Each value is an array of decimal numbers.
 * @param filePath Path to the file that will be read.
 * @returns {Promise}
 */
function readValuesFromFile(filePath, rowToArray) {
    return new Promise(function (resolve, reject) {
        let values = [];

        const rl = readline.createInterface({
            input: fs.createReadStream(filePath)
        });

        rl.on('line', function (line) {
            const numberValues = [];

            const stringValues = line.split(/,?\s+/);
            let numberValue;
            for (let i = 0; i < stringValues.length; i++) {
                numberValue = parseFloat(stringValues[i]);
                if (!isNaN(numberValue)) {
                    numberValues.push(numberValue);
                }
            }

            if (rowToArray && numberValues.length > 1) {
                values.push(numberValues);
            } else if (!rowToArray) {
                for (let i = 0; i < numberValues.length; i++) {
                    values.push(numberValues[i]);
                }
            } else {
                reject(Error('Each line has to contain at least 2 values'));
                rl.close();
            }
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

/**
 * Writes given text to a file on given path.
 * @returns {Promise}
 */
function readFromFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {
    readFromFile,
    readValuesFromFile,
    writeToFile,
};
