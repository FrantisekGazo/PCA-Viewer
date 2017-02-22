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


const styles = {
    appBar: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
    },
    content: {
        position: 'absolute',
        top: '70px',
        left: '20px',
        right: '10px',
        bottom: '10px',
    },
    left: {
        display: 'inline-block',
        position: 'absolute',
        width: '40%',
        top: '0px',
        bottom: '0px',
        left: '0px',
        transform: 'translate(-10px)',
    },
    right: {
        display: 'inline-block',
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        right: '0px',
        width: '60%',
    },
    padded: {
        marginTop: '10px',
        marginBottom: '10px'
    }
};

const ProjectScreen = ({path, detailId, onSaveClick, onCloseClick}) => {

    showMenu(true, onSaveClick, onCloseClick);

    return (
        <div>

            <AppBar
                style={styles.appBar}
                title={path}
                iconElementLeft={
                    <IconButton onTouchTap={onCloseClick}><IconClose/></IconButton>
                }
                iconElementRight={
                    <IconMenu
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        iconButtonElement={
                            <IconButton><IconMore/></IconButton>
                        }>

                        <MenuItem primaryText="Settings"/>
                        <MenuItem primaryText='Help' onTouchTap={() => HelpService.showHelp()}/>
                    </IconMenu>
                }/>

            <div style={styles.content}>

                <div style={styles.left}>

                    <ConnectedDatasetList/>

                    {
                        (detailId) ? (
                            <div style={styles.padded}>
                                <ConnectedDatasetDetail key={`dataset-${detailId}`}/>
                            </div>
                        ) : null
                    }
                </div>

                <div style={styles.right}>

                    <ConnectedProjectResults/>

                    <div style={styles.padded}>
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
