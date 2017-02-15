"use strict";

const React = require('react');
const { connect } = require('react-redux');

const SetupScreen = require('../../components/Setup/SetupScreen.jsx');
const { goBackFromSetup, startNewProject } = require('../../../actions/project');


module.exports = connect(
    // state to props
    (state) => {
        return {};
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onBackClick: () => {
                dispatch(goBackFromSetup());
            },
            onCreateClick: (params) => {
                dispatch(startNewProject(params));
            }
        };
    }
)(SetupScreen);
