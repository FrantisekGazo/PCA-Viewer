"use strict";

const React = require('react');
const {connect} = require('react-redux');

const DatasetList = require('../../components/Project/DatasetList/DatasetList.jsx');
const ProjectAction = require('../../../action/ProjectAction');
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
                dispatch(ProjectAction.createAddDatasetAction());
            },
            onDatasetClick: (id) => {
                dispatch(ProjectAction.createShowDatasetDetailAction(id));
            }
        };
    }
)(DatasetList);
