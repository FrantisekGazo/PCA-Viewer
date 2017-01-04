"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectScreen = require('../components/ProjectScreen.jsx');
const { closeProject, openExistingProject, saveProject, startNewProject } = require('../../actions/project');


module.exports = connect(
    // state to props
    (state, props) => {
        return {
            path: state.project.path,
            showDetail: state.project.detail != null
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onSaveClick: () => {
                dispatch(saveProject())
            },
            onCloseClick: () => {
                dispatch(closeProject())
            }
        };
    }
)(ProjectScreen);
