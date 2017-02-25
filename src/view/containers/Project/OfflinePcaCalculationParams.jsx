"use strict";

const React = require('react');
const { connect } = require('react-redux');
const { Card } = require('material-ui/Card');

const ConnectedStreamWindowSizeEditor = require('./ConnectedStreamWindowSizeEditor');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


/**
 * Shows a Card with parameters for the offline PCA calculation.
 */
const Params = ({ hasConstantSampling }) => (
    <Card>
        {
            hasConstantSampling ? null : (<ConnectedStreamWindowSizeEditor/>)
        }
    </Card>
);


module.exports = connect(
    // state to props
    (state) => {
        return {
            hasConstantSampling: ProjectSelector.hasConstantSampling(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {};
    }
)(Params);
