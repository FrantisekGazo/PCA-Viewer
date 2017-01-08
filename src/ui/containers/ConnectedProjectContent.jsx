"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectContent = require('../components/ProjectContent.jsx');
const { getPCA, getTransformedEntries } = require('../../selector/pca');


module.exports = connect(
    // state to props
    (state) => {
        const pca = getPCA(state);
        return {
            eigenvalues: pca.getEigenvalues(),
            cumulativeVariance: pca.getCumulativeVariance(),
            transformedEntries: getTransformedEntries(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {};
    }
)(ProjectContent);
