"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectScreen = require('../components/ProjectScreen.jsx');
const { closeProject, saveProject } = require('../../actions/project');
const { isDetailShown } = require('../../selector/dataset');


module.exports = connect(
    // state to props
    (state, props) => {
        return {
            path: state.project.path,
            showDetail: isDetailShown(state)
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
