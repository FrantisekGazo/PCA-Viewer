"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectResults = require('../../components/Project/Results/ProjectResults.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            resultsVersion: ProjectSelector.getResultsVersion(state),
            selectedEntryIds: ProjectSelector.getDetailEntryIds(state),
            datasetsWithEntries: ProjectSelector.getIncludedDatasetsWithEntries(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onEntrySelected: (entryIds) => {
                dispatch(ProjectAction.selectEntries(entryIds));
            }
        };
    }
)(ProjectResults);
