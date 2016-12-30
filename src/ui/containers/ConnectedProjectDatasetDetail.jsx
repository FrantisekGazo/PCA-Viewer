"use strict";

const React = require('react');
const {connect} = require('react-redux');

const ProjectDatasetDetail = require('../components/ProjectDatasetDetail.jsx');
const { addData, closeAndDeleteDataset, closeDatasetDetail } = require('../../actions/project');


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
            onAddDataClicked: (datasetId) => {
                dispatch(addData(datasetId))
            },
            onDataClicked: (datasetId, dataId) => {
                // TODO
                console.log(`DO SOMETHING ON DATA CLICK! ${datasetId} ${dataId}`);
            }
        };
    }
)(ProjectDatasetDetail);
