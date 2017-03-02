"use strict";

const { TRANSFORMATIONS } = require('../Constants');

/**
 * Represents a Dataset
 */
class Dataset {

    /**
     * Creates a Dataset instance from the given object.
     * @param dataset {Object} A dataset
     * @returns {Dataset}
     */
    static fromJson(dataset) {
        return new Dataset(dataset);
    }

    /**
     * Creates a new Dataset.
     *
     * @param id {number} Dataset ID
     */
    constructor({id, name=undefined, desc=undefined, color=undefined, transformationType=undefined, transformationValue=undefined}) {
        if (id === undefined) {
            throw new Error("entry is missing an 'id'");
        }

        this.id = id;
        this.name = `Dataset ${id}`;
        this.desc = '';
        this.color = '#000000';
        // stream info
        this.transformationType = TRANSFORMATIONS.NONE; // stream transformation type
        this.transformationValue = 0; // stream transformation value
    }

    /**
     * Returns the dataset ID
     * @returns {number}
     */
    getId() {
        return this.id;
    }

    /**
     * Returns the dataset name
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * Returns the dataset description
     * @returns {string}
     */
    getDescription() {
        return this.desc;
    }

    /**
     * Returns the dataset color
     * @returns {string}
     */
    getColor() {
        return this.color;
    }

    /**
     * Returns the dataset transformation type
     * @returns {number}
     */
    getTransformationType() {
        return this.transformationType;
    }

    /**
     * Returns the dataset transformation value
     * @returns {number}
     */
    getTransformationValue() {
        return this.transformationValue;
    }
}

module.exports = Dataset;
