"use strict";

const React = require('react');

const showMenu = require('../menu/Menu');
const ConnectedDatasetList = require('../containers/ConnectedDatasetList.jsx');
const ConnectedDatasetDetail = require('../containers/ConnectedDatasetDetail.jsx');
const ConnectedProjectContent = require('../containers/ConnectedProjectContent.jsx');


const ProjectScreen = ({path, showDetail, showContent, onSaveClick, onCloseClick}) => {

    showMenu(true, onSaveClick, onCloseClick);

    return (
        <div>
            <ConnectedDatasetList/>
            { showDetail ? <ConnectedDatasetDetail/> : null }
            { showContent ? <ConnectedProjectContent/> : null }
        </div>
    );
};

ProjectScreen.propTypes = {
    path: React.PropTypes.string.isRequired,
    showDetail: React.PropTypes.bool.isRequired,
    showContent: React.PropTypes.bool.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
};

module.exports = ProjectScreen;
