"use strict";

const React = require('react');
const {connect} = require('react-redux');

const SamplingWindowSizeEditor = require('../../components/Project/CalculationParams/SamplingWindowSizeEditor.jsx');
const ProjectActionCreator = require('../../../action/ProjectActionCreator');
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
                dispatch(ProjectActionCreator.createSetSamplingAction({size: sampling}));
            }
        };
    }
)(SamplingWindowSizeEditor);
