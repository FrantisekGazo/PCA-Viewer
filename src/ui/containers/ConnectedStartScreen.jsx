"use strict";

const React = require('react');
const { connect } = require('react-redux');

const StartScreen = require('../components/StartScreen.jsx');
const { startNewProject, openExistingProject } = require('../../actions/project');


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
                dispatch(startNewProject())
            },
            onOpenExistingClicked: () => {
                dispatch(openExistingProject())
            }
        };
    }
)(StartScreen);
