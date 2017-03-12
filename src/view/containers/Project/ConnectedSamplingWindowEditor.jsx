"use strict";

const React = require('react');
const {connect} = require('react-redux');

const SamplingWindowEditor = require('../../components/Project/CalculationParams/SamplingWindowEditor.jsx');
const ProjectActionCreator = require('../../../action/ProjectActionCreator');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            samplingWindow: ProjectSelector.getSamplingWindow(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onChange: (samplingWindow) => {
                dispatch(ProjectActionCreator.createSetSamplingAction(samplingWindow));
            }
        };
    }
)(SamplingWindowEditor);
