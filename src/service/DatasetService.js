"use strict";


const { newEntry } = require('../reducer/project');
const { sortNumArrayDesc } = require('../util/util');


/**
 * Converts given values to entries.
 * @param addedEntryIds Previously added entry IDs.
 * @param values The values.
 * @param startId Last used entry ID by store.
 * @returns {Promise} that returns an Object of {entryId: entry}
 */
function valuesToEntries(addedEntryIds, values) {
    return new Promise(function (resolve, reject) {
        const newEntries = {};

        let newId = sortNumArrayDesc(addedEntryIds)[0]; // sort so that the highest ID is first

        values.map((value) => {
            newId += 1;
            newEntries[newId] = newEntry(newId, value, '#f00f00');
        });

        resolve(newEntries);
    });
}


module.exports = {
    valuesToEntries,
};