"use strict";

const React = require('react');
const {connect} = require('react-redux');

const CalculationParams = require('../../components/Project/CalculationParams/CalculationParams.jsx');
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
            onSamplingChange: (sampling) => {
                dispatch(ProjectAction.createChangeSamplingAction(sampling));
            }
        };
    }
)(CalculationParams);
