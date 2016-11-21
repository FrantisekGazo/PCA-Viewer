"use strict";

const React = require('react');
const {connect} = require('react-redux');

const ConnectedCounter = require('./ConnectedCounter.jsx');
const ConnectedTester = require('./ConnectedTester.jsx');
const ConnectedStartScreen = require('./ConnectedStartScreen.jsx');
const ConnectedProjectScreen = require('./ConnectedProjectScreen.jsx');


const AppLayout = ({path}) => {
    const screen = (path) ? (<ConnectedProjectScreen/>) : (<ConnectedStartScreen/>);
    return <div>
        {/*<ConnectedCounter/>*/}
        {/*<ConnectedTester/>*/}
        {screen}
    </div>
};

module.exports = connect(
    // state to props
    (state) => {
        return {
            path: state.project.path
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {};
    }
)(AppLayout);
