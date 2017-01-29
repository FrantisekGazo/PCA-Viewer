"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectResults = require('../components/Results/ProjectResults.jsx');
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
        return {};
    }
)(ProjectResults);
