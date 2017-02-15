"use strict";

const React = require('react');
const { connect } = require('react-redux');

const StartScreen = require('../../components/Start/StartScreen.jsx');
const { setupNewProject, openExistingProject } = require('../../../actions/project');


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
                dispatch(setupNewProject());
            },
            onOpenExistingClicked: () => {
                dispatch(openExistingProject());
            }
        };
    }
)(StartScreen);
