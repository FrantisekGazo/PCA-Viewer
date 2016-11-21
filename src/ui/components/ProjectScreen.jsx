"use strict";

const React = require('react');

const showMenu = require('../menu/Menu');


const ProjectScreen = ({path, onCloseProjectClicked}) => {

    showMenu(true, onCloseProjectClicked);

    return (
        <div>
            {path}
        </div>
    );
};

ProjectScreen.propTypes = {
    path: React.PropTypes.string.isRequired,
    onCloseProjectClicked: React.PropTypes.func.isRequired,
};

module.exports = ProjectScreen;
