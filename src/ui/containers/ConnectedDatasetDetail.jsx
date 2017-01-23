"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetDetail = require('../components/DatasetDetail.jsx');
const { updateDataset, closeAndDeleteDataset, closeDatasetDetail } = require('../../actions/project');
const { getDetailDatasetEntries, getDetailDataset, getLastEntryId } = require('../../selector/dataset');


module.exports = connect(
    // state to props
    (state) => {
        return {
            dataset: getDetailDataset(state),
            lastEntryId: getLastEntryId(state),
            datasetEntries: getDetailDatasetEntries(state)
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
            onEntryClick: (datasetId, entryId) => {
                // TODO
                console.log(`DO SOMETHING ON DATA CLICK! ${datasetId} ${entryId}`);
            }
        };
    }
)(DatasetDetail);
