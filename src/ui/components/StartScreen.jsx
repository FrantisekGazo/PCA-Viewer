"use strict";

const React = require('react');
const FlatButton = require('material-ui/FlatButton').default;

const { ColorPicker, colors } = require('../components/ColorPicker');
const showMenu = require('../menu/Menu');


const StartScreen = ({error, onStartNewClicked, onOpenExistingClicked}) => {
    let errorMsg = (error) ? (<p>{error}</p>) : null;

    showMenu();

    return (
        <div>
            <FlatButton label="Start a new project" onTouchTap={onStartNewClicked} />
            <br/>
            <FlatButton label="Open an existing project" onTouchTap={onOpenExistingClicked} />
            { errorMsg }
            <ColorPicker colors={colors} value= '#E74C3C' onChange={() => {}}/>
        </div>
    );
};

StartScreen.propTypes = {
    error: React.PropTypes.string.isRequired,
    onStartNewClicked: React.PropTypes.func.isRequired,
    onOpenExistingClicked: React.PropTypes.func.isRequired
};

module.exports = StartScreen;
