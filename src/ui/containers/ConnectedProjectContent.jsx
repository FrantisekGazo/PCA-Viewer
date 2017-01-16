"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectContent = require('../components/ProjectContent.jsx');
const { getCumulativeVariance, getEigenvalues, getTransformedEntries } = require('../../selector/pca');


module.exports = connect(
    // state to props
    (state) => {
        return {
            eigenvalues: getEigenvalues(state),
            cumulativeVariance: getCumulativeVariance(state),
            transformedEntries: getTransformedEntries(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {};
    }
)(ProjectContent);
