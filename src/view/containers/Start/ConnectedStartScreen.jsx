"use strict";

const React = require('react');
const { connect } = require('react-redux');

const StartScreen = require('../../components/Start/StartScreen.jsx');
const ProjectAction = require('../../../action/ProjectAction');


module.exports = connect(
    // state to props
    (state) => {
        return {
            error: state.project.error
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onStartNewClicked: () => {
                dispatch(ProjectAction.setupNewProject());
            },
            onOpenExistingClicked: (path) => {
                dispatch(ProjectAction.openExistingProject(path));
            }
        };
    }
)(StartScreen);
