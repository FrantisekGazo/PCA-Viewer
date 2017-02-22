"use strict";

const React = require('react');
const {connect} = require('react-redux');

const StreamDatasetDetail = require('../../components/Project/DatasetDetail/StreamDatasetDetail.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = (single) => connect(
    // state to props
    (state) => {
        const datasetId = ProjectSelector.getDetailDatasetId(state);

        return {
            dataset: ProjectSelector.getDataset(state, datasetId),
            included: ProjectSelector.isDatasetIncluded(state, datasetId),
            stream: ProjectSelector.getDatasetStream(state, datasetId),
            transformedStream: ProjectSelector.getDatasetTransformedStream(state, datasetId),
            single: single,
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onSaveClick: (datasetId, changes) => {
                dispatch(ProjectAction.updateDataset(datasetId, changes))
            },
            onCloseClick: (datasetId) => {
                dispatch(ProjectAction.closeDatasetDetail(datasetId))
            },
            onDeleteClick: (datasetId) => {
                dispatch(ProjectAction.closeAndDeleteDataset(datasetId))
            },
            onEntrySelected: (entryIds) => {
                dispatch(ProjectAction.selectEntries(entryIds));
            }
        };
    }
)(StreamDatasetDetail);
