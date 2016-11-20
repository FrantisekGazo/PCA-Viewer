"use strict";

const React = require('react');
const {connect} = require('react-redux');

const ConnectedCounter = require('./ConnectedCounter.jsx');
const ConnectedTester = require('./ConnectedTester.jsx');


const AppLayout = ({}) => {
    return <div>
        <ConnectedCounter/>
        <ConnectedTester/>
    </div>
};

module.exports = connect(
    // state to props
    (state) => {
        return {};
    },
    // dispatch functions to props
    (dispatch) => {
        return {};
    }
)(AppLayout);
