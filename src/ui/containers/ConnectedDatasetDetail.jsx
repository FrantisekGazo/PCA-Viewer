"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetDetail = require('../components/DatasetDetail.jsx');
const { loadEntries, updateDataset, closeAndDeleteDataset, closeDatasetDetail } = require('../../actions/project');
const { getDetailDatasetEntries, getDetailDataset } = require('../../selector/dataset');


module.exports = connect(
    // state to props
    (state) => {
        return {
            dataset: getDetailDataset(state),
            datasetEntries: getDetailDatasetEntries(state)
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onSaveClick: (datasetId, datasetChanges) => {
                dispatch(updateDataset(datasetId, datasetChanges))
            },
            onCloseClick: (datasetId) => {
                dispatch(closeDatasetDetail(datasetId))
            },
            onDeleteClick: (datasetId) => {
                dispatch(closeAndDeleteDataset(datasetId))
            },
            onLoadEntriesClick: (datasetId) => {
                dispatch(loadEntries(datasetId))
            },
            onEntryClick: (datasetId, entryId) => {
                // TODO
                console.log(`DO SOMETHING ON DATA CLICK! ${datasetId} ${entryId}`);
            }
        };
    }
)(DatasetDetail);
