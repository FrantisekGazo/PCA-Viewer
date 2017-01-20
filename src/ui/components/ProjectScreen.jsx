"use strict";

const React = require('react');

const showMenu = require('../menu/Menu');
const ConnectedDatasetList = require('../containers/ConnectedDatasetList.jsx');
const ConnectedDatasetDetail = require('../containers/ConnectedDatasetDetail.jsx');
const ConnectedProjectContent = require('../containers/ConnectedProjectContent.jsx');


const ProjectScreen = ({showDetail, onSaveClick, onCloseClick}) => {

    showMenu(true, onSaveClick, onCloseClick);

    return (
        <div>
            <ConnectedDatasetList/>
            { showDetail ? <ConnectedDatasetDetail/> : null }
            <ConnectedProjectContent/>
        </div>
    );
};

ProjectScreen.propTypes = {
    showDetail: React.PropTypes.bool.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
};

module.exports = ProjectScreen;
