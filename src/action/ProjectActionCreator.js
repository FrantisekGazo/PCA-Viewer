"use strict";

const BaseActionCreator = require('./BaseActionCreator');


/**
 * Creates project actions.
 */
class ProjectActionCreator extends BaseActionCreator {

    constructor() {
        super({
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
        });
    }

    /**
     * Creates an action for showing an error message in current project.
     * @param errorMessage {string} An error message.
     * @returns {Object} An action
     */
    createProjectErrorAction(errorMessage) {
        return this.createAction(this.ACTIONS.SHOW_PROJECT_ERROR, errorMessage);
    }

    /**
     * Creates an action for loading project from given directory.
     * @param projectPath {string} Project directory.
     * @returns {Object} An action
     */
    createLoadProjectAction(projectPath) {
        return this.createAction(this.ACTIONS.LOAD_PROJECT, projectPath);
    }

    /**
     * Creates an action for setting current project up with given state.
     * @param projectState {Object} New project state.
     * @returns {Object} An action
     */
    createSetProjectAction(projectState) {
        return this.createAction(this.ACTIONS.SET_PROJECT, projectState);
    }

    /**
     * Creates an action for closing current project.
     * @returns {Object} An action
     */
    createCloseProjectAction() {
        return this.createAction(this.ACTIONS.CLOSE_PROJECT);
    }

    /**
     * Creates an action for adding new dataset.
     * @returns {Object} An action
     */
    createAddDatasetAction() {
        return this.createAction(this.ACTIONS.NEW_DATASET);
    }

    /**
     * Creates an action for updating the dataset with given ID.
     * @param datasetId {number} A dataset ID.
     * @param changes {Object} Changes made on the dataset and it's entries.
     * @returns {Object} An action
     */
    createUpdateDatasetAction(datasetId, changes) {
        return this.createAction(this.ACTIONS.UPDATE_DATASET, {datasetId, changes});
    }

    /**
     * Creates an action for showing a detail of dataset with given ID.
     * @param datasetId {number} A dataset ID.
     * @returns {Object} An action
     */
    createShowDatasetDetailAction(datasetId) {
        return this.createAction(this.ACTIONS.SHOW_DATASET_DETAIL, datasetId);
    }

    /**
     * Creates an action for closing a detail of dataset with given ID.
     * @param datasetId {number} A dataset ID.
     * @returns {Object} An action
     */
    createCloseDatasetDetailAction(datasetId) {
        return this.createAction(this.ACTIONS.CLOSE_DATASET_DETAIL, datasetId);
    }

    /**
     * Creates an action for deteleing a dataset with given ID.
     * @param datasetId {number} A dataset ID.
     * @returns {Object} An action
     */
    createDeleteDatasetAction(datasetId) {
        return this.createAction(this.ACTIONS.DELETE_DATASET, datasetId);
    }

    /**
     * Creates an action for saving current project.
     * @returns {Object} An action
     */
    createSaveProjectAction() {
        return this.createAction(this.ACTIONS.SAVE_PROJECT);
    }

    /**
     * Creates an action for selecting entries with given IDs.
     * @param entryIds {Array} Entries IDs or null
     * @returns {Object} An action
     */
    createSelectEntryAction(entryIds) {
        return this.createAction(this.ACTIONS.SELECT_ENTRIES, entryIds);
    }

    /**
     * Creates an action for deleting entries with given IDs.
     * @param entryIds {Array} Entries IDs or null
     * @returns {Object} An action
     */
    createDeleteEntriesAction(entryIds) {
        return this.createAction(this.ACTIONS.DELETE_ENTRIES, entryIds);
    }

    /**
     * Creates an action for setting new sampling.
     * @param samplingWindow {Object} Sampling window setup
     * @returns {Object} An action
     */
    createSetSamplingAction(samplingWindow) {
        return this.createAction(this.ACTIONS.SET_SAMPLING, samplingWindow);
    }

    /**
     * Creates an action for setting new selected entries.
     * @param sampledEntries {Object} Array of selected entries IDs
     * @returns {Object} An action
     */
    createSetSampledEntriesAction(sampledEntries) {
        return this.createAction(this.ACTIONS.SET_SAMPLED_ENTRIES, sampledEntries);
    }
}


module.exports = new ProjectActionCreator();
