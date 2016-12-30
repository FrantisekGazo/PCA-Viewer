"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetDetail = require('../components/DatasetDetail.jsx');
const { addEntries, closeAndDeleteDataset, closeDatasetDetail } = require('../../actions/project');


module.exports = connect(
    // state to props
    (state) => {
        return {
            dataset: state.project.datasets[state.project.detail]
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onCloseClicked: (datasetId) => {
                dispatch(closeDatasetDetail(datasetId))
            },
            onDeleteClicked: (datasetId) => {
                dispatch(closeAndDeleteDataset(datasetId))
            },
            onAddEntriesClicked: (datasetId) => {
                dispatch(addEntries(datasetId))
            },
            onEntryClicked: (datasetId, entryId) => {
                // TODO
                console.log(`DO SOMETHING ON DATA CLICK! ${datasetId} ${entryId}`);
            }
        };
    }
)(DatasetDetail);
