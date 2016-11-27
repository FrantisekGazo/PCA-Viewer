"use strict";

const React = require('react');
const {connect} = require('react-redux');

const ProjectData = require('../components/ProjectData.jsx');
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
)(ProjectData);
