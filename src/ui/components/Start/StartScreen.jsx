"use strict";

const React = require('react');
const RaisedButton = require('material-ui/RaisedButton').default;
const IconCreate = require('material-ui/svg-icons/file/create-new-folder').default;
const IconOpen = require('material-ui/svg-icons/file/folder-open').default;

const showMenu = require('../../menu/Menu');


const optionContainerStyle = {
    position: 'absolute',
    width: '520px', // 4x5 + 2x250
    // center it:
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};
const optionStyle = {
    display: 'inline-block',
    margin: '5px',
    height: '180px',
    width: '250px',
};
const iconStyle = {
    position: 'relative',
    top: '20px',
    width: '100px',
    height: '100px',
};
const textStyle = {
    position: 'relative',
    top: '10px',
};
const errorStyle = {
    display: 'block',
    position: 'fixed',
    // center horizontally:
    left: '50%',
    transform: 'translate(-50%)',
    padding: '10px',
    color: '#ffffff',
};

const StartScreen = ({error, onStartNewClicked, onOpenExistingClicked}) => {
    let errorMsg = (error) ? (<div style={errorStyle}>{error}</div>) : null;

    showMenu();

    return (
        <div style={optionContainerStyle}>

            <RaisedButton
                style={optionStyle}
                onTouchTap={onStartNewClicked}>

                <IconCreate style={iconStyle}/>
                <p style={textStyle}>Start a new project</p>
            </RaisedButton>

            <RaisedButton
                style={optionStyle}
                onTouchTap={onOpenExistingClicked}>

                <IconOpen style={iconStyle}/>
                <p style={textStyle}>Open an existing project</p>
            </RaisedButton>

            { errorMsg }
        </div>
    );
};

StartScreen.propTypes = {
    error: React.PropTypes.string.isRequired,
    onStartNewClicked: React.PropTypes.func.isRequired,
    onOpenExistingClicked: React.PropTypes.func.isRequired
};

module.exports = StartScreen;
