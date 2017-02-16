"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectResults = require('../../components/Project/Results/ProjectResults.jsx');
const { selectEntries } = require('../../../actions/ProjectAction');
const ProjectSelector = require('../../../selector/ProjectSelector');


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
                dispatch(selectEntries(entryIds));
            }
        };
    }
)(ProjectResults);
