"use strict";

const React = require('react');
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;


/**
 * React component that shows the application.
 * Adds style to the inner components.
 */
class App extends React.Component {

    render() {
        const { children } = this.props;

        return (
            <MuiThemeProvider>{children}</MuiThemeProvider>
        );
    }
}

module.exports = App;
