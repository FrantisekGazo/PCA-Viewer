"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetDetail = require('../components/DatasetDetail.jsx');
const { loadEntries, closeAndDeleteDataset, closeDatasetDetail } = require('../../actions/project');


module.exports = connect(
    // state to props
    (state) => {
        const dataset = state.project.datasets[state.project.detail];

        return {
            dataset,
            datasetEntries: dataset.entries.map(entryId => state.project.entries[entryId])
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
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
