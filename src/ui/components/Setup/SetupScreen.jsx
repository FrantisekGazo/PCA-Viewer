"use strict";

const React = require('react');
const AppBar = require('material-ui/AppBar').default;
const IconButton = require('material-ui/IconButton').default;
const IconBack = require('material-ui/svg-icons/navigation/arrow-back').default;
const IconMore = require('material-ui/svg-icons/navigation/more-vert').default;
const IconMenu = require('material-ui/IconMenu').default;
const MenuItem = require('material-ui/MenuItem').default;
const Snackbar = require('material-ui/Snackbar').default;

const ProjectSelector = require('./ProjectSelector.jsx');
const HelpUtil = require('../../../util/HelpUtil');
const showMenu = require('../../menu/Menu');


const styles = {
    appBar: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
    },
    contentDiv: {
        position: 'absolute',
        top: '70px',
        left: '10px',
        right: '10px',
        bottom: '10px',
    }
};


/**
 * React component that shows whole setup screen.
 */
class SetupScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: ''
        };
    }

    handleError(errorMessage) {
        this.setState({
            error: errorMessage
        });
    }

    onSnackbarClose() {
        this.setState({
            error: ''
        });
    }

    render() {
        const { error } = this.state;
        const { onCreateClick, onBackClick } = this.props;

        showMenu();

        return (
            <div>

                <AppBar
                    style={styles.appBar}
                    title='New Project'
                    iconElementLeft={
                        <IconButton>
                            <IconBack onTouchTap={this.props.onBackClick}/>
                        </IconButton>
                    }
                    iconElementRight={
                        <IconMenu
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            iconButtonElement={
                                <IconButton><IconMore /></IconButton>
                            }>

                            <MenuItem primaryText='Help' onTouchTap={() => HelpUtil.showHelp()}/>
                        </IconMenu>
                    }/>

                <div style={styles.contentDiv}>

                    <ProjectSelector
                        onCreateClick={onCreateClick}
                        onBackClick={onBackClick}
                        onShowError={this.handleError.bind(this)}/>

                    <Snackbar
                        open={error !== ''}
                        message={error}
                        autoHideDuration={3000}
                        onRequestClose={this.onSnackbarClose.bind(this)}/>
                </div>
            </div>
        );
    }
}

SetupScreen.propTypes = {
    onCreateClick: React.PropTypes.func.isRequired,
    onBackClick: React.PropTypes.func.isRequired,
};

module.exports = SetupScreen;
