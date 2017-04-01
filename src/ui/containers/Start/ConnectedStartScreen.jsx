"use strict";

const React = require('react');
const { connect } = require('react-redux');

const StartScreen = require('../../components/Start/StartScreen.jsx');
const ProjectActionCreator = require('../../../action/ProjectActionCreator');
const RouterActionCreator = require('../../../action/RouterActionCreator');


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
            onStartNewClick: () => {
                dispatch(RouterActionCreator.createGoToSetupScreenAction());
            },
            onOpenExistingClick: (path) => {
                dispatch(ProjectActionCreator.createLoadProjectAction(path));
            }
        };
    }
)(StartScreen);
