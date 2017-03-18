"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetList = require('../../components/Project/DatasetList/DatasetList.jsx');
const ProjectActionCreator = require('../../../action/ProjectActionCreator');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


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
            onAddDatasetClick: () => {
                dispatch(ProjectActionCreator.createAddDatasetAction());
            },
            onDatasetClick: (id) => {
                dispatch(ProjectActionCreator.createShowDatasetDetailAction(id));
            }
        };
    }
)(DatasetList);
