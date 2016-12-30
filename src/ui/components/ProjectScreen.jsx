"use strict";

const React = require('react');

const showMenu = require('../menu/Menu');
const ConnectedDatasetList = require('../containers/ConnectedDatasetList.jsx');
const ConnectedDatasetDetail = require('../containers/ConnectedDatasetDetail.jsx');
const ConnectedProjectContent = require('../containers/ConnectedProjectContent.jsx');


const ProjectScreen = ({path, showDetail, onCloseProjectClicked}) => {

    showMenu(true, onCloseProjectClicked);

    return (
        <div>
            <ConnectedDatasetList/>
            { showDetail ? <ConnectedDatasetDetail/> : null }
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
