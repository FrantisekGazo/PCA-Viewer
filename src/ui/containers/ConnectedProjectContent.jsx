"use strict";

const React = require('react');
const {connect} = require('react-redux');

const ProjectContent = require('../components/ProjectContent.jsx');
const { getPCA } = require('../../selector/pca');


module.exports = connect(
    // state to props
    (state) => {
        return {
            pca: getPCA(state)
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {};
    }
)(ProjectContent);
