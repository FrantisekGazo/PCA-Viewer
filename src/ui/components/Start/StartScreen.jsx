"use strict";

const React = require('react');
const IconCreate = require('material-ui/svg-icons/file/create-new-folder').default;
const IconOpen = require('material-ui/svg-icons/file/folder-open').default;

const StartButton = require('./StartButton.jsx');
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

                <StartButton
                    label={'Start a new project'}
                    iconComponent={IconCreate}
                    onClick={onStartNewClicked}/>

                <StartButton
                    label={'Open an existing project'}
                    iconComponent={IconOpen}
                    onClick={this.handleOpenExisting.bind(this)}/>

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
