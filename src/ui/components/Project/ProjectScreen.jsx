"use strict";

const React = require('react');
const AppBar = require('material-ui/AppBar').default;
const IconButton = require('material-ui/IconButton').default;
const IconMenu = require('material-ui/IconMenu').default;
const MenuItem = require('material-ui/MenuItem').default;
const IconClose = require('material-ui/svg-icons/navigation/close').default;
const IconMore = require('material-ui/svg-icons/navigation/more-vert').default;

const HelpService = require('../../../service/HelpService');
const showMenu = require('../../menu/Menu');
const ConnectedDatasetList = require('../../containers/Project/ConnectedDatasetList.jsx');
const ConnectedDatasetDetail = require('../../containers/Project/ConnectedDatasetDetail.jsx');
const ConnectedProjectResults = require('../../containers/Project/ConnectedProjectResults.jsx');
const ConnectedEntrySelection = require('../../containers/Project/ConnectedEntrySelection.jsx');


const ProjectScreen = ({path, detailId, onSaveClick, onCloseClick}) => {

    showMenu(true, onSaveClick, onCloseClick);

    let detail = null;
    if (detailId !== null) {
        detail = (
            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px'
                }}>
                <ConnectedDatasetDetail key={`dataset-${detailId}`}/>
            </div>
        );
    }

    return (
        <div>

            <AppBar
                style={{
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    top: 0,
                }}
                title={path}
                iconElementLeft={
                    <IconButton onTouchTap={onCloseClick}>
                        <IconClose />
                    </IconButton>
                }
                iconElementRight={
                    <IconMenu
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        iconButtonElement={
                            <IconButton><IconMore /></IconButton>
                        }>

                        <MenuItem primaryText="Settings"/>
                        <MenuItem primaryText='Help' onTouchTap={() => HelpService.showHelp()}/>
                    </IconMenu>
                }/>


            <div
                id='content'
                style={{
                    position: 'absolute',
                    top: '70px',
                    left: '20px',
                    right: '10px',
                    bottom: '10px',
                }}>

                <div
                    style={{
                        display: 'inline-block',
                        position: 'absolute',
                        width: '40%',
                        top: '0px',
                        bottom: '0px',
                        left: '0px',
                        transform: 'translate(-10px)',
                    }}>
                    <ConnectedDatasetList/>
                    { detail }
                </div>

                <div
                    style={{
                        display: 'inline-block',
                        position: 'absolute',
                        top: '0px',
                        bottom: '0px',
                        right: '0px',
                        width: '60%',
                    }}>
                    <ConnectedProjectResults/>

                    <div
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}>
                        <ConnectedEntrySelection/>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProjectScreen.propTypes = {
    path: React.PropTypes.string.isRequired,
    detailId: React.PropTypes.number,
    onSaveClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
};

module.exports = ProjectScreen;