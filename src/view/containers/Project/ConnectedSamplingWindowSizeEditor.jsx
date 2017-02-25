"use strict";

const React = require('react');
const {connect} = require('react-redux');

const SamplingWindowSizeEditor = require('../../components/Project/CalculationParams/SamplingWindowSizeEditor.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            sampling: ProjectSelector.getSamplingWindow(state).size,
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onChange: (sampling) => {
                dispatch(ProjectAction.createSetSamplingAction({size: sampling}));
            }
        };
    }
)(SamplingWindowSizeEditor);
