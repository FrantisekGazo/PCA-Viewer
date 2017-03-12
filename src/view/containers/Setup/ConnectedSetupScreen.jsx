"use strict";

const React = require('react');
const { connect } = require('react-redux');

const SetupScreen = require('../../components/Setup/SetupScreen.jsx');
const ProjectActionCreator = require('../../../action/ProjectActionCreator');
const RouterActionCreator = require('../../../action/RouterActionCreator');


module.exports = connect(
    // state to props
    (state) => {
        return {};
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onBackClick: () => {
                dispatch(RouterActionCreator.createGoToStartScreenAction());
            },
            onCreateClick: (params) => {
                dispatch(ProjectActionCreator.createSetProjectAction(params));
            }
        };
    }
)(SetupScreen);
