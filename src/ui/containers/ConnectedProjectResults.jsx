"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectResults = require('../components/Results/ProjectResults.jsx');
const { selectEntry } = require('../../actions/project');
const { getAllDatasets, getAllEntriesMap } = require('../../selector/dataset');


module.exports = connect(
    // state to props
    (state) => {
        return {
            resultsVersion: state.project.resultsVersion,
            datasets: getAllDatasets(state),
            entries: getAllEntriesMap(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onEntrySelected: (datasetId, entryId) => {
                dispatch(selectEntry(datasetId, entryId));
            }
        };
    }
)(ProjectResults);
