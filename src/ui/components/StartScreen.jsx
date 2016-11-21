"use strict";

const React = require('react');

const showMenu = require('../menu/Menu');


const StartScreen = ({error, onStartNewClicked, onOpenExistingClicked}) => {
    let errorMsg = (error) ? (<p>{error}</p>) : null;

    showMenu();

    return (
        <div>
            <button onClick={onStartNewClicked}>Start a new project</button>
            <button onClick={onOpenExistingClicked}>Open an existing project</button>
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
