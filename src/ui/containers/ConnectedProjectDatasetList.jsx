"use strict";

const React = require('react');
const {connect} = require('react-redux');

const ProjectDatasetList = require('../components/ProjectDatasetList.jsx');
const { addData } = require('../../actions/project');


module.exports = connect(
    // state to props
    (state) => {
        return {};
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onAddDataClicked: () => {
                dispatch(addData())
            }
        };
    }
)(ProjectDatasetList);
