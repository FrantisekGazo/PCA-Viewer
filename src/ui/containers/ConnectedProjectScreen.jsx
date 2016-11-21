"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectScreen = require('../components/ProjectScreen.jsx');
const { closeProject, openExistingProject, startNewProject } = require('../../actions/project');


module.exports = connect(
    // state to props
    (state) => {
        return {
            path: state.project.path
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onCloseProjectClicked: () => {
                dispatch(closeProject())
            }
        };
    }
)(ProjectScreen);
