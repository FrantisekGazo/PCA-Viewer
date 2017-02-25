"use strict";

const React = require('react');
const {connect} = require('react-redux');

const StreamWindowSizeEditor = require('../../components/Project/CalculationParams/StreamWindowSizeEditor.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            sampling: ProjectSelector.getSampling(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onChange: (sampling) => {
                dispatch(ProjectAction.createChangeSamplingAction(sampling));
            }
        };
    }
)(StreamWindowSizeEditor);
