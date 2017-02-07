"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectResults = require('../components/Results/ProjectResults.jsx');
const { selectEntries } = require('../../actions/project');
const selector = require('../../selector/dataset');


module.exports = connect(
    // state to props
    (state) => {
        return {
            resultsVersion: selector.getResultsVersion(state),
            selectedEntryIds: selector.getDetailEntryIds(state),
            datasets: selector.getIncludedDatasets(state),
            entries: selector.getAllEntriesMap(state),
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
