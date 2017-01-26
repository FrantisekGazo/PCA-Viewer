"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectResults = require('../components/ProjectResults.jsx');
const { setUsedEigenpairs } = require('../../actions/project');


module.exports = connect(
    // state to props
    (state) => {
        return {
            pca: state.project.pca,
            usedEigenpairs: state.project.usedEigenpairs
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onEigenpairsChanged: (newIndexes) => {
                dispatch(setUsedEigenpairs(newIndexes))
            }
        };
    }
)(ProjectResults);
