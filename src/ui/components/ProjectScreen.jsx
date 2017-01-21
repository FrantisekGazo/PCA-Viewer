"use strict";

const React = require('react');

const showMenu = require('../menu/Menu');
const ConnectedDatasetList = require('../containers/ConnectedDatasetList.jsx');
const ConnectedDatasetDetail = require('../containers/ConnectedDatasetDetail.jsx');
const ConnectedProjectResults = require('../containers/ConnectedProjectResults.jsx');


const ProjectScreen = ({showDetail, onSaveClick, onCloseClick}) => {

    showMenu(true, onSaveClick, onCloseClick);

    let detail = null;
    if (showDetail) {
        detail = (
            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px'
                }}>
                <ConnectedDatasetDetail/>
            </div>
        );
    }

    return (
        <div>
            <div style={{
                display: 'inline-block',
                position: 'absolute',
                top: '0px',
                left: '10px',
                width: '600px'
            }}>
                <ConnectedDatasetList/>
                { detail }
            </div>

            <div style={{
                display: 'inline-block',
                position: 'absolute',
                top: '0px',
                left: '620px',
                width: '700px'
            }}>
                <ConnectedProjectResults/>
            </div>
        </div>
    );
};

ProjectScreen.propTypes = {
    showDetail: React.PropTypes.bool.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
};

module.exports = ProjectScreen;
