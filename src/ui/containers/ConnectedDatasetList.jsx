"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetList = require('../components/DatasetList.jsx');
const { addDataset, showDatasetDetail } = require('../../actions/project');
const selector = require('../../selector/dataset');


module.exports = connect(
    // state to props
    (state) => {
        return {
            datasets: selector.getAllDatasets(state),
            includedDatasetIds: selector.getIncludedDatasetIds(state)
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
