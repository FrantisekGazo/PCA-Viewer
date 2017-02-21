"use strict";

const React = require('react');
const { connect } = require('react-redux');

const SetupScreen = require('../../components/Setup/SetupScreen.jsx');
const ProjectAction = require('../../../action/ProjectAction');


module.exports = connect(
    // state to props
    (state) => {
        return {};
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onBackClick: () => {
                dispatch(ProjectAction.goBackFromSetup());
            },
            onCreateClick: (params) => {
                dispatch(ProjectAction.startNewProject(params));
            }
        };
    }
)(SetupScreen);
