"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetDetail = require('../../components/Project/DatasetDetail/DatasetDetail.jsx');
const { closeAndDeleteDataset, closeDatasetDetail, updateDataset, selectEntries } = require('../../../actions/ProjectAction');
const ProjectSelector = require('../../../selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        const datasetId = ProjectSelector.getDetailDatasetId(state);

        return {
            dataset: ProjectSelector.getDataset(state, datasetId),
            included: ProjectSelector.isDatasetIncluded(state, datasetId),
            entries: ProjectSelector.getDatasetEntries(state, datasetId),
            selectedEntryIds: ProjectSelector.getDetailEntryIds(state),
            stream: ProjectSelector.getDatasetStream(state, datasetId),
            transformedStream: ProjectSelector.getDatasetTransformedStream(state, datasetId),
            lastEntryId: ProjectSelector.getLastEntryId(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onSaveClick: (datasetId, changes) => {
                dispatch(updateDataset(datasetId, changes))
            },
            onCloseClick: (datasetId) => {
                dispatch(closeDatasetDetail(datasetId))
            },
            onDeleteClick: (datasetId) => {
                dispatch(closeAndDeleteDataset(datasetId))
            },
            onEntrySelected: (entryIds) => {
                dispatch(selectEntries(entryIds));
            }
        };
    }
)(DatasetDetail);
