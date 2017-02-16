"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectScreen = require('../../components/Project/ProjectScreen.jsx');
const { closeProject, saveProject } = require('../../../actions/ProjectAction');
const ProjectSelector = require('../../../selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state, props) => {
        return {
            path: ProjectSelector.getPath(state),
            detailId: ProjectSelector.getDetailDatasetId(state)
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
