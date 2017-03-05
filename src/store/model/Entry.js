"use strict";

/**
 * Represents one dataset entry
 */
class Entry {

    /**
     * Creates an Entry instance from the given object.
     * @param entry {Object} An entry
     * @returns {Entry}
     */
    static fromJson(entry) {
        return new Entry(entry);
    }

    /**
     * Creates a new Entry.
     *
     * @param id {number} Entry ID
     * @param datasetId {number} Dataset ID
     * @param name {string} Entry name
     * @param value {Array} Entry value
     * @param streamIndex {number} Index in dataset stream (if there is one)
     */
    constructor({id, datasetId, name, value, streamIndex}) {
        if (id === undefined) {
            throw new Error("entry is missing an 'id'");
        }
        if (datasetId === undefined) {
            throw new Error("entry is missing a 'datasetId'");
        }

        this.id = id;
        this.datasetId = datasetId;
        this.name = (name) ? name : `E${id}`;
        this.value = value ? value : [];
        this.streamIndex = streamIndex;
    }

    /**
     * Returns the entry ID
     * @returns {number}
     */
    getId() {
        return this.id;
    }

    /**
     * Returns the entry's dataset ID
     * @returns {number}
     */
    getDatasetId() {
        return this.datasetId;
    }

    /**
     * Returns the entry name
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * Returns the entry value
     * @returns {Array}
     */
    getValue() {
        return this.value;
    }

    /**
     * Returns the entry index in dataset stream (if there is one)
     * @returns {number}
     */
    getStreamIndex() {
        return this.streamIndex;
    }

    /**
     * Returns true if the entry is part of the stream, false otherwise.
     * @returns {boolean}
     */
    isPartOfStream() {
        return this.streamIndex !== undefined;
    }
}

module.exports = Entry;
