"use strict";

const React = require('react');
const {connect} = require('react-redux');

const Tester = require('../components/Tester.jsx');
const {testDialog, testWorker} = require('../../actions/tester');


const ConnectedTester = connect(
    // state to props
    (state) => {
        return {
            text: state.tester.text,
            error: state.tester.error,
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onChooseDirClicked: () => {
                dispatch(testDialog())
            },
            onProcessClicked: (text) => {
                dispatch(testWorker(text))
            }
        };
    }
)(Tester);

module.exports = ConnectedTester;
