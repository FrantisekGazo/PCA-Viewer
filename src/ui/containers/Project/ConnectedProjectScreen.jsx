"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectScreen = require('../../components/Project/ProjectScreen.jsx');
const ProjectActionCreator = require('../../../action/ProjectActionCreator');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state, props) => {
        return {
            projectName: ProjectSelector.getName(state),
            detailId: ProjectSelector.getDetailDatasetId(state)
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onSaveClick: () => {
                dispatch(ProjectActionCreator.createSaveProjectAction());
            },
            onCloseClick: () => {
                dispatch(ProjectActionCreator.createCloseProjectAction());
            }
        };
    }
)(ProjectScreen);
