"use strict";

const React = require('react');
const RaisedButton = require('material-ui/RaisedButton').default;
const IconCreate = require('material-ui/svg-icons/file/create-new-folder').default;
const IconOpen = require('material-ui/svg-icons/file/folder-open').default;

const showMenu = require('../../menu/Menu');
const DialogUtil = require('../../../util/DialogUtil');


const styles = {
    optionContainer: {
        position: 'absolute',
        width: '520px', // 4x5 + 2x250
        // center it:
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    option: {
        display: 'inline-block',
        margin: '5px',
        height: '180px',
        width: '250px',
    },
    icon: {
        position: 'relative',
        top: '20px',
        width: '100px',
        height: '100px',
    },
    text: {
        position: 'relative',
        top: '10px',
    },
    error: {
        display: 'block',
        position: 'fixed',
        // center horizontally:
        left: '50%',
        transform: 'translate(-50%)',
        padding: '10px',
        color: '#ffffff',
    }
};


/**
 * React component that shows whole start screen.
 */
class StartScreen extends React.Component {

    handleOpenExisting() {
        DialogUtil.showOpenDirDialog()
            .then((path) => {
                this.props.onOpenExistingClicked(path);
            });
    }

    render() {
        const {error, onStartNewClicked} = this.props;
        let errorMsg = (error) ? (<div style={styles.error}>{error}</div>) : null;

        showMenu();

        return (
            <div style={styles.optionContainer}>

                <RaisedButton
                    style={styles.option}
                    onTouchTap={onStartNewClicked}>

                    <IconCreate style={styles.icon}/>
                    <p style={styles.text}>Start a new project</p>
                </RaisedButton>

                <RaisedButton
                    style={styles.option}
                    onTouchTap={this.handleOpenExisting.bind(this)}>

                    <IconOpen style={styles.icon}/>
                    <p style={styles.text}>Open an existing project</p>
                </RaisedButton>

                { errorMsg }
            </div>
        );
    }
}

StartScreen.propTypes = {
    error: React.PropTypes.string.isRequired,
    onStartNewClicked: React.PropTypes.func.isRequired,
    onOpenExistingClicked: React.PropTypes.func.isRequired
};

module.exports = StartScreen;
