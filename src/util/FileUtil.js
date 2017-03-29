"use strict";

const readline = require('readline');
const fs = require('fs');

const { WorkerTaskNames, WorkerUtil } = require('./WorkerUtil');


/**
 * Provides methods for loading and manipulating data files.
 */
class FileUtil {

    /**
     * Reads the given file and returns read values. Each value is an array of decimal numbers.
     * @param filePath Path to the file that will be read.
     * @param sampling {number} Number of values for one row.
     * If <code>null</code> then all values will be returned as one array.
     * @returns {Promise}
     */
    static readValuesFromFile(filePath, sampling=null) {
        return new Promise(function (resolve, reject) {
            let values = [];

            const rl = readline.createInterface({
                input: fs.createReadStream(filePath)
            });

            rl.on('line', function (line) {
                const numberValues = [];

                const stringValues = line.replace(',', '.').split(/\s+/);
                let numberValue;
                for (let i = 0; i < stringValues.length; i++) {
                    numberValue = parseFloat(stringValues[i]);
                    if (!isNaN(numberValue)) {
                        numberValues.push(numberValue);
                    }
                }

                for (let i = 0; i < numberValues.length; i++) {
                    values.push(numberValues[i]);
                }
            });

            rl.on('close', function () {
                // sample the values if it is specified
                if (sampling) {
                    let sampledValues = [];
                    let s;
                    for (let i = 0; i <= values.length - sampling; i += sampling) {
                        s = values.slice(i, i + sampling);
                        sampledValues.push(s);
                    }
                    values = sampledValues;
                }

                if (values.length > 0) {
                    resolve(values);
                } else {
                    reject(Error('File contains no values!'));
                }
            });
        });
    }

    /**
     * Writes given text to a file on given path.
     * @returns {Promise}
     */
    static  writeToFile(filePath, text) {
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
     * Reads a file on given path in current process.
     * @returns {Promise}
     */
    static readTextFromFileSync(filePath) {
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

    /**
     * Reads a file on given path in another process.
     * @returns {Promise}
     */
    static readTextFromFileAsync(filePath) {
        return WorkerUtil.execByWorker(WorkerTaskNames.READ_FILE, filePath);
    }

    /**
     * Reads a file on given path.
     * @returns {Promise}
     */
    static readJsonFromFile(filePath) {
        return FileUtil.readTextFromFileAsync(filePath)
            .then((content) => {
                return JSON.parse(content);
            })
    }
}

module.exports = FileUtil;
