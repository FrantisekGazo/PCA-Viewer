"use strict";


const Entry = require('../store/model/Entry');
const { sortNumArrayDesc } = require('../util');


/**
 * Converts given values to entries.
 * @param addedEntryIds Previously added entry IDs.
 * @param values The values.
 * @param startId Last used entry ID by store.
 * @returns {Promise} that returns an Object of {entryId: entry}
 */
function valuesToEntries(datasetId, addedEntryIds, values) {
    return new Promise(function (resolve, reject) {
        const newEntries = [];

        let newId = sortNumArrayDesc(addedEntryIds)[0]; // sort so that the highest ID is first

        let value, entry;
        for (let i = 0; i < values.length; i++) {
            value = values[i];
            newId += 1;
            entry = new Entry({datasetId: datasetId, id: newId, value: value});
            newEntries.push(entry);
        }

        resolve(newEntries);
    });
}


module.exports = {
    valuesToEntries,
};