"use strict";

const React = require('react');
const AppBar = require('material-ui/AppBar').default;
const IconButton = require('material-ui/IconButton').default;
const IconMenu = require('material-ui/IconMenu').default;
const MenuItem = require('material-ui/MenuItem').default;
const IconClose = require('material-ui/svg-icons/navigation/close').default;
const IconMore = require('material-ui/svg-icons/navigation/more-vert').default;

const showMenu = require('../menu/Menu');
const ConnectedDatasetList = require('../containers/ConnectedDatasetList.jsx');
const ConnectedDatasetDetail = require('../containers/ConnectedDatasetDetail.jsx');
const ConnectedProjectResults = require('../containers/ConnectedProjectResults.jsx');


const AppBarMenu = ({}) => {
    return (
        <IconMenu
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            iconButtonElement={
                <IconButton><IconMore color={'#ffffff'}/></IconButton>
            }>

            <MenuItem primaryText="Settings"/>
            <MenuItem primaryText="Help"/>
        </IconMenu>
    );
};

const ProjectScreen = ({path, showDetail, onSaveClick, onCloseClick}) => {

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
                iconElementRight={<AppBarMenu />} />
            <div>

                <div style={{
                    display: 'inline-block',
                    position: 'absolute',
                    top: '70px',
                    left: '20px',
                    right: '60%',
                    bottom: '10px',
                    transform: 'translate(-10px)',
                }}>
                    <ConnectedDatasetList/>
                    { detail }
                </div>

                <div style={{
                    display: 'inline-block',
                    position: 'absolute',
                    top: '70px',
                    left: '40%',
                    right: '10px',
                    bottom: '10px',
                }}>
                    <ConnectedProjectResults/>
                </div>
            </div>
        </div>
    );
};

ProjectScreen.propTypes = {
    path: React.PropTypes.string.isRequired,
    showDetail: React.PropTypes.bool.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
};

module.exports = ProjectScreen;
