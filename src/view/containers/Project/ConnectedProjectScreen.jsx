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
            path: ProjectSelector.getPath(state),
            detailId: ProjectSelector.getDetailDatasetId(state)
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onSaveClick: () => {
                dispatch(ProjectAction.saveProject())
            },
            onCloseClick: () => {
                dispatch(ProjectAction.closeProject())
            }
        };
    }
)(ProjectScreen);
