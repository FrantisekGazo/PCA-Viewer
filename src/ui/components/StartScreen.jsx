"use strict";

const React = require('react');
const FlatButton = require('material-ui/FlatButton').default;

const ColorPicker = require('../../ColorPicker/components/ColorPicker.jsx');
const showMenu = require('../menu/Menu');


const colors = [
    "#1ABC9C",
    "#16A085",
    "#2ECC71",
    "#27AE60",
    "#3498DB",
    "#2980B9",
    "#9B59B6",
    "#8E44AD",
    "#34495E",
    "#2C3E50",
    "#F1C40F",
    "#F39C12",
    "#E67E22",
    "#D35400",
    "#E74C3C",
    "#C0392B",
    "#ECF0F1",
    "#BDC3C7",
    "#95A5A6",
    "#7F8C8D"
];

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
