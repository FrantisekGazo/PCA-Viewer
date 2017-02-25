"use strict";

const React = require('react');
const {connect} = require('react-redux');

const EntryDatasetDetail = require('../../components/Project/DatasetDetail/EntryDatasetDetail.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        const datasetId = ProjectSelector.getDetailDatasetId(state);

        return {
            dataset: ProjectSelector.getDataset(state, datasetId),
            included: ProjectSelector.isDatasetIncluded(state, datasetId),
            entries: ProjectSelector.getDatasetEntries(state, datasetId),
            selectedEntryIds: ProjectSelector.getSelectedEntryIds(state),
            sampling: ProjectSelector.getSamplingWindow(state).size,
            lastEntryId: ProjectSelector.getLastEntryId(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onSaveClick: (datasetId, changes) => {
                dispatch(ProjectAction.createUpdateDatasetAction(datasetId, changes));
            },
            onCloseClick: (datasetId) => {
                dispatch(ProjectAction.createCloseDatasetDetailAction(datasetId));
            },
            onDeleteClick: (datasetId) => {
                dispatch(ProjectAction.createDeleteDatasetAction(datasetId));
            },
            onEntrySelected: (entryIds) => {
                dispatch(ProjectAction.createSelectEntryAction(entryIds));
            }
        };
    }
)(EntryDatasetDetail);
