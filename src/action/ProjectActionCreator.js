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
    DELETE_ENTRIES: 'DELETE_ENTRIES',

    SET_SAMPLING: 'SET_SAMPLING',
    SET_SAMPLED_ENTRIES: 'SET_SAMPLED_ENTRIES',
};


/**
 * Creates project actions.
 */
class ProjectActionCreator {

    /**
     * Creates an action for showing an error message in current project.
     * @param errorMessage {string} An error message.
     * @returns {Object} An action
     */
    static createProjectErrorAction(errorMessage) {
        return createAction(ACTIONS.SHOW_PROJECT_ERROR, errorMessage);
    }

    /**
     * Creates an action for loading project from given directory.
     * @param projectPath {string} Project directory.
     * @returns {Object} An action
     */
    static createLoadProjectAction(projectPath) {
        return createAction(ACTIONS.LOAD_PROJECT, projectPath);
    }

    /**
     * Creates an action for setting current project up with given state.
     * @param projectState {Object} New project state.
     * @returns {Object} An action
     */
    static createSetProjectAction(projectState) {
        return createAction(ACTIONS.SET_PROJECT, projectState);
    }

    /**
     * Creates an action for closing current project.
     * @returns {Object} An action
     */
    static createCloseProjectAction() {
        return createAction(ACTIONS.CLOSE_PROJECT);
    }

    /**
     * Creates an action for adding new dataset.
     * @returns {Object} An action
     */
    static createAddDatasetAction() {
        return createAction(ACTIONS.NEW_DATASET);
    }

    /**
     * Creates an action for updating the dataset with given ID.
     * @param datasetId {number} A dataset ID.
     * @param changes {Object} Changes made on the dataset and it's entries.
     * @returns {Object} An action
     */
    static createUpdateDatasetAction(datasetId, changes) {
        return createAction(ACTIONS.UPDATE_DATASET, {datasetId, changes});
    }

    /**
     * Creates an action for showing a detail of dataset with given ID.
     * @param datasetId {number} A dataset ID.
     * @returns {Object} An action
     */
    static createShowDatasetDetailAction(datasetId) {
        return createAction(ACTIONS.SHOW_DATASET_DETAIL, datasetId);
    }

    /**
     * Creates an action for closing a detail of dataset with given ID.
     * @param datasetId {number} A dataset ID.
     * @returns {Object} An action
     */
    static createCloseDatasetDetailAction(datasetId) {
        return createAction(ACTIONS.CLOSE_DATASET_DETAIL, datasetId);
    }

    /**
     * Creates an action for deteleing a dataset with given ID.
     * @param datasetId {number} A dataset ID.
     * @returns {Object} An action
     */
    static createDeleteDatasetAction(datasetId) {
        return createAction(ACTIONS.DELETE_DATASET, datasetId);
    }

    /**
     * Creates an action for saving current project.
     * @returns {Object} An action
     */
    static createSaveProjectAction() {
        return createAction(ACTIONS.SAVE_PROJECT);
    }

    /**
     * Creates an action for selecting entries with given IDs.
     * @param entryIds {Array} Entries IDs or null
     * @returns {Object} An action
     */
    static createSelectEntryAction(entryIds) {
        return createAction(ACTIONS.SELECT_ENTRIES, entryIds);
    }

    /**
     * Creates an action for deleting entries with given IDs.
     * @param entryIds {Array} Entries IDs or null
     * @returns {Object} An action
     */
    static createDeleteEntriesAction(entryIds) {
        return createAction(ACTIONS.DELETE_ENTRIES, entryIds);
    }

    /**
     * Creates an action for setting new sampling.
     * @param samplingWindow {Object} Sampling window setup
     * @returns {Object} An action
     */
    static createSetSamplingAction(samplingWindow) {
        return createAction(ACTIONS.SET_SAMPLING, samplingWindow);
    }

    /**
     * Creates an action for setting new selected entries.
     * @param sampledEntries {Object} Array of selected entries IDs
     * @returns {Object} An action
     */
    static createSetSampledEntriesAction(sampledEntries) {
        return createAction(ACTIONS.SET_SAMPLED_ENTRIES, sampledEntries);
    }
}

ProjectActionCreator.ACTIONS = ACTIONS;


module.exports = ProjectActionCreator;
