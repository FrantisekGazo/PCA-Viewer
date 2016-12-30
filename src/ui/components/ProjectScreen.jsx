"use strict";

const React = require('react');

const showMenu = require('../menu/Menu');
const ConnectedProjectDatasetList = require('../containers/ConnectedProjectDatasetList.jsx');
const ConnectedProjectDatasetDetail = require('../containers/ConnectedProjectDatasetDetail.jsx');
const ConnectedProjectContent = require('../containers/ConnectedProjectContent.jsx');


const ProjectScreen = ({path, showDetail, onCloseProjectClicked}) => {

    showMenu(true, onCloseProjectClicked);

    return (
        <div>
            <ConnectedProjectDatasetList/>
            { showDetail ? <ConnectedProjectDatasetDetail/> : null }
            <ConnectedProjectContent/>
        </div>
    );
};

ProjectScreen.propTypes = {
    path: React.PropTypes.string.isRequired,
    showDetail: React.PropTypes.bool.isRequired,
    onCloseProjectClicked: React.PropTypes.func.isRequired,
};

module.exports = ProjectScreen;
