"use strict";

const React = require('react');
const { connect } = require('react-redux');
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;


const AppLayout = ({children}) => {
    return <div>
        <MuiThemeProvider>
            {children}
        </MuiThemeProvider>
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
