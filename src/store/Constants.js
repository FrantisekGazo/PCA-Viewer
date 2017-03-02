"use strict";

/**
 * Default size of sampling window.
 * @type {number} size
 */
const DEFAULT_SAMPLING_WINDOW_SIZE = 100;

/**
 * Name of the file that is used for saving and restoring projects in different directories.
 * @type {string} File name
 */
const PROJECT_FILE_NAME = 'project.json';

/**
 * Supported project types.
 * @type {{OFFLINE_PCA: number, ONLINE_PCA: number}}
 */
const PROJECT_TYPE = {
    OFFLINE_PCA: 1,
    ONLINE_PCA: 2,
};

/**
 * Supported data stream transformations.
 * @type {{NONE: number, DIFF: number, COUNT: number}}
 */
const TRANSFORMATIONS = {
    NONE: 1,
    DIFF: 2,
    COUNT: 3
};

const ADDITIONAL_SAMPLES_COUNT = 1;


module.exports = {
    DEFAULT_SAMPLING_WINDOW_SIZE,
    PROJECT_FILE_NAME,
    PROJECT_TYPE,
    TRANSFORMATIONS,
};
