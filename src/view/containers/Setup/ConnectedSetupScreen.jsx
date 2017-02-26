"use strict";

const React = require('react');
const { connect } = require('react-redux');

const SetupScreen = require('../../components/Setup/SetupScreen.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const RouterAction = require('../../../action/RouterAction');


module.exports = connect(
    // state to props
    (state) => {
        return {};
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onBackClick: () => {
                dispatch(RouterAction.createGoToStartScreenAction());
            },
            onCreateClick: (params) => {
                dispatch(ProjectAction.createSetProjectAction(params));
            }
        };
    }
)(SetupScreen);
