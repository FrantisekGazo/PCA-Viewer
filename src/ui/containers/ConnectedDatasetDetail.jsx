"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetDetail = require('../components/DatasetDetail/DatasetDetail.jsx');
const { closeAndDeleteDataset, closeDatasetDetail, updateDataset, selectEntry } = require('../../actions/project');
const selector = require('../../selector/dataset');


module.exports = connect(
    // state to props
    (state) => {
        const datasetId = selector.getDetailDatasetId(state);

        return {
            dataset: selector.getDataset(state, datasetId),
            entries: selector.getDatasetEntries(state, datasetId),
            selectedEntryIds: selector.getDetailEntryIds(state),
            stream: selector.getDatasetStream(state, datasetId),
            transformedStream: selector.getDatasetTransformedStream(state, datasetId),
            lastEntryId: selector.getLastEntryId(state),
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
            onEntrySelected: (datasetId, entryId) => {
                dispatch(selectEntry(datasetId, entryId));
            }
        };
    }
)(DatasetDetail);
