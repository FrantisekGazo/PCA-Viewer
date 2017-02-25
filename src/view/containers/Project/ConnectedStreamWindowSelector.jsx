"use strict";

const React = require('react');
const {connect} = require('react-redux');

const StreamWindowSelector = require('../../components/Project/CalculationParams/StreamWindowSelector.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            start: ProjectSelector.getSamplingStart(state),
            fixedCount: ProjectSelector.getFixedSamplingCount(state),
            additionalCount: ProjectSelector.getAdditionalSamplingCount(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onStartChange: (startIndex) => {
                dispatch(ProjectAction.createSetSamplingStartAction(startIndex));
            },
            onFixedCountChange: (count) => {
                dispatch(ProjectAction.createSetFixedSamplingCountAction(count));
            },
            onAdditionalCountChange: (count) => {
                dispatch(ProjectAction.createSetAdditionalSamplingCountAction(count));
            }
        };
    }
)(StreamWindowSelector);
