"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetList = require('../components/DatasetList.jsx');
const { addDataset, showDatasetDetail } = require('../../actions/project');


module.exports = connect(
    // state to props
    (state) => {
        return {
            datasets: state.project.usedDatasets.map(id => state.project.datasets[id])
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onAddDatasetClicked: () => {
                dispatch(addDataset())
            },
            onDatasetClicked: (id) => {
                dispatch(showDatasetDetail(id))
            }
        };
    }
)(DatasetList);
