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

class ProjectScreen extends React.Component {

    addPadding(component, wrapperKey) {
        if (component) {
            return (
                <div style={styles.padded} key={wrapperKey}>
                    {component}
                </div>
            );
        } else {
            return null;
        }

    }

    render() {
        const { projectName, detailId, onSaveClick, onCloseClick } = this.props;
        // optional inner components
        const { datasets, detail, results, entrySelection } = this.props;

        showMenu(true, onSaveClick, onCloseClick);

        return (
            <div>

                <AppBar
                    style={styles.appBar}
                    title={projectName}
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

                        { datasets }

                        {/* detail needs a key in oder to change the whole component if stored detail ID changes */}
                        { (detailId !== null) ? this.addPadding(detail, `dataset-${detailId}`) : null }

                    </div>

                    <div style={styles.right}>

                        { results }

                        { this.addPadding(entrySelection) }

                    </div>
                </div>
            </div>
        );
    }
}

ProjectScreen.propTypes = {
    projectName: React.PropTypes.string.isRequired,
    detailId: React.PropTypes.number,
    onSaveClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
};

module.exports = ProjectScreen;
