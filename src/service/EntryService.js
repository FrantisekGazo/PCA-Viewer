"use strict";

function readFromFile(filePath) {
    return new Promise(function (resolve, reject) {
        console.log('LOAD FILE:', filePath);

        const ids = [];
        for (let i = 1; i < 1000; i++) {
            ids.push(i);
        }

        const result = ids.map(num => {
            return {id: num, name: `Entry ${num}`, values: [1, 2, 3]}
        });
        console.log('LOAD RESULT:', result);

        resolve(result);
        //reject(Error('Nothing selected'));
    });
}

module.exports = {
    readFromFile
};