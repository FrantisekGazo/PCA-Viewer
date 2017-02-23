"use strict";

const { createAction } = require('./index');


const ACTIONS = {
    SHOW_PROJECT_ERROR: 'SHOW_PROJECT_ERROR',
    LOAD_PROJECT: 'LOAD_PROJECT',
    SET_PROJECT: 'SET_PROJECT',
    CLOSE_PROJECT: 'CLOSE_PROJECT',
    SAVE_PROJECT: 'SAVE_PROJECT',
    NEW_DATASET: 'NEW_DATASET',
    UPDATE_DATASET: 'UPDATE_DATASET',
    DELETE_DATASET: 'DELETE_DATASET',
    SHOW_DATASET_DETAIL: 'SHOW_DATASET_DETAIL',
    CLOSE_DATASET_DETAIL: 'CLOSE_DATASET_DETAIL',
    SELECT_ENTRIES: 'SELECT_ENTRIES',
};


/**
 * Creates an action for showing an error message in current project.
 * @param errorMessage An error message.
 * @returns {Object} An action
 */
function createProjectErrorAction(errorMessage) {
    return createAction(ACTIONS.SHOW_PROJECT_ERROR, errorMessage);
}

/**
 * Creates an action for loading project from given directory.
 * @param projectPath Project directory.
 * @returns {Object} An action
 */
function createLoadProjectAction(projectPath) {
    return createAction(ACTIONS.LOAD_PROJECT, projectPath);
}

/**
 * Creates an action for setting current project up with given state.
 * @param projectState New project state.
 * @returns {Object} An action
 */
function createSetProjectAction(projectState) {
    return createAction(ACTIONS.SET_PROJECT, projectState);
}

/**
 * Creates an action for closing current project.
 * @returns {Object} An action
 */
function createCloseProjectAction() {
    return createAction(ACTIONS.CLOSE_PROJECT);
}

/**
 * Creates an action for adding new dataset.
 * @returns {Object} An action
 */
function createAddDatasetAction() {
    return createAction(ACTIONS.NEW_DATASET);
}

/**
 * Creates an action for updating the dataset with given ID.
 * @param datasetId Dataset ID.
 * @param changes Changes made on the dataset and it's entries.
 * @returns {Object} An action
 */
function createUpdateDatasetAction(datasetId, changes) {
    return createAction(ACTIONS.UPDATE_DATASET, {datasetId, changes});
}

/**
 * Creates an action for showing a detail of dataset with given ID.
 * @param datasetId A dataset ID.
 * @returns {Object} An action
 */
function createShowDatasetDetailAction(datasetId) {
    return createAction(ACTIONS.SHOW_DATASET_DETAIL, datasetId);
}

/**
 * Creates an action for closing a detail of dataset with given ID.
 * @param datasetId A dataset ID.
 * @returns {Object} An action
 */
function createCloseDatasetDetailAction(datasetId) {
    return createAction(ACTIONS.CLOSE_DATASET_DETAIL, datasetId);
}

/**
 * Creates an action for deteleing a dataset with given ID.
 * @param datasetId A dataset ID.
 * @returns {Object} An action
 */
function createDeleteDatasetAction(datasetId) {
    return createAction(ACTIONS.DELETE_DATASET, datasetId);
}

/**
 * Creates an action for saving current project.
 * @returns {Object} An action
 */
function createSaveProjectAction() {
    return createAction(ACTIONS.SAVE_PROJECT);
}

/**
 * Creates an action for selecting entries with given IDs.
 * @param entryIds Entries IDs
 * @returns {Object} An action
 */
function createSelectEntryAction(entryIds) {
    return createAction(ACTIONS.SELECT_ENTRIES, entryIds);
}


module.exports = {
    ACTIONS,
    createProjectErrorAction,
    createLoadProjectAction,
    createSetProjectAction,
    createCloseProjectAction,
    createShowDatasetDetailAction,
    createCloseDatasetDetailAction,
    createAddDatasetAction,
    createUpdateDatasetAction,
    createDeleteDatasetAction,
    createSaveProjectAction,
    createSelectEntryAction,
};
