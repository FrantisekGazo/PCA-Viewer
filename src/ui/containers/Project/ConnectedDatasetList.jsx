"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetList = require('../../components/Project/DatasetList.jsx');
const { addDataset, showDatasetDetail } = require('../../../actions/ProjectAction');
const ProjectSelector = require('../../../selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            datasets: ProjectSelector.getAllDatasets(state),
            includedDatasetIds: ProjectSelector.getIncludedDatasetIds(state)
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
