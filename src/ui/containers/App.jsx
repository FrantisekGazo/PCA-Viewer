"use strict";

const React = require('react');
const {connect} = require('react-redux');


const AppLayout = ({children}) => {
    return <div>
        {children}
    </div>
};

module.exports = connect(
    // state to props
    (state, props) => {
        return {};
    },
    // dispatch functions to props
    (dispatch) => {
        return {};
    }
)(AppLayout);
