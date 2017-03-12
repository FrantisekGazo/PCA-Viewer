"use strict";

const React = require('react');
const {connect} = require('react-redux');

const StreamDatasetDetail = require('../../components/Project/DatasetDetail/StreamDatasetDetail.jsx');
const ProjectActionCreator = require('../../../action/ProjectActionCreator');
const ProjectSelector = require('../../../store/selector/ProjectSelector');
const { PROJECT_TYPE } = require('../../../store/Constants');


module.exports = connect(
    // state to props
    (state) => {
        const datasetId = ProjectSelector.getDetailDatasetId(state);

        return {
            dataset: ProjectSelector.getDataset(state, datasetId),
            included: ProjectSelector.isDatasetIncluded(state, datasetId),
            stream: ProjectSelector.getDatasetStream(state, datasetId),
            transformedStream: ProjectSelector.getDatasetTransformedStream(state, datasetId),
            single: ProjectSelector.getType(state) === PROJECT_TYPE.ONLINE_PCA,
            selectedEntries: ProjectSelector.getSelectedDatasetEntries(state, datasetId),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onSaveClick: (datasetId, changes) => {
                dispatch(ProjectActionCreator.createUpdateDatasetAction(datasetId, changes));
            },
            onCloseClick: (datasetId) => {
                dispatch(ProjectActionCreator.createCloseDatasetDetailAction(datasetId));
            },
            onDeleteClick: (datasetId) => {
                dispatch(ProjectActionCreator.createDeleteDatasetAction(datasetId));
            },
            onEntrySelected: (entryIds) => {
                dispatch(ProjectActionCreator.createSelectEntryAction(entryIds));
            }
        };
    }
)(StreamDatasetDetail);
