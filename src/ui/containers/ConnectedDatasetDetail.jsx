"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetDetail = require('../components/DatasetDetail/DatasetDetail.jsx');
const { closeAndDeleteDataset, closeDatasetDetail, updateDataset, selectEntry } = require('../../actions/project');
const { getDataset, getDatasetEntries, getDatasetStream, getDatasetTransformedStream, getDetailId, getLastEntryId } = require('../../selector/dataset');


module.exports = connect(
    // state to props
    (state) => {
        const datasetId = getDetailId(state);

        return {
            dataset: getDataset(state, datasetId),
            entries: getDatasetEntries(state, datasetId),
            stream: getDatasetStream(state, datasetId),
            transformedStream: getDatasetTransformedStream(state, datasetId),
            lastEntryId: getLastEntryId(state),
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
