"use strict";


const Entry = require('../store/model/Entry');
const { sortNumArrayDesc } = require('../util');


/**
 * Provides methods for dataset manipulation.
 */
class DatasetUtil {

    /**
     * Converts given values to entries.
     * @param datasetId Dataset ID.
     * @param addedEntryIds Previously added entry IDs.
     * @param values The values.
     * @returns {Promise} that returns an Object of {entryId: entry}
     */
    static valuesToEntries(datasetId, addedEntryIds, values) {
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
}

module.exports = DatasetUtil;