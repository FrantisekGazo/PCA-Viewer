"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectScreen = require('../components/ProjectScreen.jsx');
const { closeProject, saveProject } = require('../../actions/project');
const { getPCA } = require('../../selector/pca');


module.exports = connect(
    // state to props
    (state, props) => {
        return {
            path: state.project.path,
            showDetail: state.project.detail !== null,
            showContent: getPCA(state) !== null
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
