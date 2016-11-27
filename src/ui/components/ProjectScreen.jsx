"use strict";

const React = require('react');

const showMenu = require('../menu/Menu');


const ProjectScreen = ({children, path, onCloseProjectClicked}) => {

    showMenu(true, onCloseProjectClicked);

    return (
        <div>
            {path}
            {children}
        </div>
    );
};

ProjectScreen.propTypes = {
    path: React.PropTypes.string.isRequired,
    onCloseProjectClicked: React.PropTypes.func.isRequired,
};

module.exports = ProjectScreen;
