"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectResults = require('../components/ProjectResults.jsx');


module.exports = connect(
    // state to props
    (state) => {
        return {
            pca: state.project.pca
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {};
    }
)(ProjectResults);
