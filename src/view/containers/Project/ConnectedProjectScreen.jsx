"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectScreen = require('../../components/Project/ProjectScreen.jsx');
const ProjectAction = require('../../../action/ProjectAction');
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
                dispatch(ProjectAction.createSaveProjectAction());
            },
            onCloseClick: () => {
                dispatch(ProjectAction.createCloseProjectAction());
            }
        };
    }
)(ProjectScreen);
