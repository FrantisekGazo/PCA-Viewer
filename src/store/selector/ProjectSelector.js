"use strict";


const { baseStreamId, transformedStreamId } = require('../reducer/ProjectReducer');


/**
 * Selects data from the Store.
 */
class ProjectSelector {

    /**
     * Returns project part of the state.
     * @param state {Object} Current store state
     * @returns {Object}
     */
    static getProjectState(state) {
        return state.project;
    }

    /**
     * Returns project directory path.
     * @param state {Object} Current store state
     * @returns {string}
     */
    static getPath(state) {
        return ProjectSelector.getProjectState(state).path;
    }

    /**
     * Returns project name.
     * @param state {Object} Current store state
     * @returns {string}
     */
    static getName(state) {
        return ProjectSelector.getProjectState(state).name;
    }

    /**
     * Returns the sampling window information.
     * @param state {Object} Current store state
     * @returns {Object}
     */
    static getSamplingWindow(state) {
        return ProjectSelector.getProjectState(state).samplingWindow;
    }

    /**
     * Returns current version of the project data.
     * @param state {Object} Current store state
     * @returns {number}
     */
    static getVersion(state) {
        return ProjectSelector.getProjectState(state).version;
    }

    /**
     * Returns all entries.
     * @param state {Object} Current store state
     * @returns {Array}
     */
    static getAllEntries(state) {
        return ProjectSelector.getProjectState(state).entries;
    }

    /**
     * Returns ID of currently shown dataset.
     * @param state {Object} Current store state
     * @returns {number}
     */
    static getDetailDatasetId(state) {
        return ProjectSelector.getProjectState(state).detailDatasetId;
    }

    /**
     * Returns dataset for given ID.
     * @param state {Object} Current store state
     * @param datasetId {number} Dataset ID
     * @returns {Object}
     */
    static getDataset(state, datasetId) {
        return ProjectSelector.getProjectState(state).datasets[datasetId];
    }

    /**
     * Returns max ID used for an entry.
     * @param state {Object} Current store state
     * @returns {number}
     */
    static getLastEntryId(state) {
        return ProjectSelector.getProjectState(state).lastEntryId;
    }

    /**
     * Returns all entries for dataset with given ID.
     * @param state {Object} Current store state
     * @param datasetId {number} Dataset ID
     * @returns {Array}
     */
    static getDatasetEntries(state, datasetId) {
        let entries = [];

        const entryMap = ProjectSelector.getProjectState(state).entries;
        const entryIds = Object.keys(entryMap);
        let entry;
        for (let i = 0; i < entryIds.length; i++) {
            entry = entryMap[entryIds[i]];
            if (entry && entry.datasetId === datasetId) {
                entries.push(entry);
            }
        }

        return entries;
    }

    /**
     * Returns original stream for dataset with given ID.
     * @param state {Object} Current store state
     * @param datasetId {number} Dataset ID
     * @returns {Array}
     */
    static getDatasetStream(state, datasetId) {
        const stream = ProjectSelector.getProjectState(state).streams[baseStreamId(datasetId)];
        return stream ? stream : [];
    }

    /**
     * Returns transformed stream for dataset with given ID.
     * @param state {Object} Current store state
     * @param datasetId {number} Dataset ID
     * @returns {Array}
     */
    static getDatasetTransformedStream(state, datasetId) {
        const stream = ProjectSelector.getProjectState(state).streams[transformedStreamId(datasetId)];
        return stream ? stream : [];
    }

    /**
     * Returns all dataset IDs that should be used for PCA calculation.
     * @param state {Object} Current store state
     * @returns {Array}
     */
    static getIncludedDatasetIds(state) {
        return ProjectSelector.getProjectState(state).usedDatasetIds;
    }

    /**
     * <code>true</code> if dataset with given ID should be included in PCA calculation
     * @param state {Object} Current store state
     * @param datasetId {number}
     * @returns {boolean}
     */
    static isDatasetIncluded(state, datasetId) {
        return ProjectSelector.getIncludedDatasetIds(state).indexOf(datasetId) >= 0;
    }

    /**
     * Returns all datasets.
     * @param state {Object} Current store state
     * @returns {Array}
     */
    static getAllDatasets(state) {
        const s = ProjectSelector.getProjectState(state);
        return Object.keys(s.datasets)
            .map(id => s.datasets[id])
            .filter(d => d !== undefined && d !== null);
    }

    /**
     * Returns all entries that should be used for PCA calculation.
     * @param state {Object} Current store state
     * @returns {Array}
     */
    static getIncludedDatasetsWithEntries(state) {
        const includedDatasetIds = ProjectSelector.getIncludedDatasetIds(state);
        const includedDatasets = includedDatasetIds.map(id => Object.assign({entries: []}, ProjectSelector.getDataset(state, id))); // make modifiable copy
        const { entries } = ProjectSelector.getProjectState(state);

        let entry, index;
        for (let id in entries) {
            if (!entries.hasOwnProperty(id)) continue;

            entry = entries[id];
            index = includedDatasetIds.indexOf(entry.datasetId);
            if (index >= 0) {
                includedDatasets[index].entries.push(entry);
            }
        }

        const sortEntries = (a, b) => a.id - b.id;
        let dataset;
        for (let i = 0; i < includedDatasets.length; i++) {
            dataset = includedDatasets[i];
            dataset.entries = dataset.entries.sort(sortEntries);
        }

        return includedDatasets;
    }

    /**
     * Returns project type.
     * @param state {Object} Current store state
     * @returns {number}
     */
    static getType(state) {
        return ProjectSelector.getProjectState(state).type;
    }

    /**
     * Returns all IDs for currently selected entries.
     * @param state {Object} Current store state
     * @returns {Array}
     */
    static getSelectedEntryIds(state) {
        const ids = ProjectSelector.getProjectState(state).selectedEntryIds;
        return ids ? ids : [];
    }

    /**
     * Returns all selected entries.
     * @param state {Object} Current store state
     * @returns {Array}
     */
    static getSelectedEntries(state) {
        const entryIds = ProjectSelector.getSelectedEntryIds(state);
        const projectState = ProjectSelector.getProjectState(state);
        const datasetColors = {};
        ProjectSelector.getAllDatasets(state).map(d => datasetColors[d.id] = d.color);

        return entryIds.map(id => {
            const entry = projectState.entries[id];
            return Object.assign({}, entry, {color: datasetColors[entry.datasetId]});
        });
    }

    /**
     * Returns all selected entries in dataset with given ID.
     * @param state {Object} Current store state
     * @param datasetId {number} Dataset ID
     * @returns {Array}
     */
    static getSelectedDatasetEntries(state, datasetId) {
        const entryIds = ProjectSelector.getSelectedEntryIds(state);
        const projectState = ProjectSelector.getProjectState(state);

        return entryIds.map(id => projectState.entries[id])
            .filter(entry => entry.datasetId === datasetId);
    }
}


module.exports = ProjectSelector;
