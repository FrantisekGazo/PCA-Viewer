"use strict";


const { newEntry } = require('../reducer/project');

function valuesToEntries(dataset, values, startId) {
    return new Promise(function (resolve, reject) {
        console.log('ID start:', startId);

        let newId = startId;

        // maybe you already loaded entries, so check for higher ID
        const entryIds = dataset.entries.sort().reverse(); // sort so that the highest ID is first
        if (entryIds.lenght > 0) {
            if (startId < entryIds[0]) {
                newId = entryIds[0];
            }
        }

        console.log('ID new:', newId);

        const newEntries = values.map((value) => {
            newId += 1;
            dataset.entries.push(newId);
            return newEntry(newId, value, dataset.color);
        });

        resolve({
            dataset: dataset,
            entries: newEntries
        });
    });
}

module.exports = {
    valuesToEntries
};