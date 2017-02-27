"use strict";

const React = require('react');
const AppBar = require('material-ui/AppBar').default;
const { Card } = require('material-ui/Card');
const TextField = require('material-ui/TextField').default;
const IconButton = require('material-ui/IconButton').default;
const IconBack = require('material-ui/svg-icons/navigation/arrow-back').default;
const IconMore = require('material-ui/svg-icons/navigation/more-vert').default;
const IconOpenFolder = require('material-ui/svg-icons/file/folder-open').default;
const IconMenu = require('material-ui/IconMenu').default;
const MenuItem = require('material-ui/MenuItem').default;
const FlatButton = require('material-ui/FlatButton').default;
const Snackbar = require('material-ui/Snackbar').default;

const ProjectTypeSelector = require('./ProjectTypeSelector.jsx');
const HelpUtil = require('../../../util/HelpUtil');
const DialogUtil = require('../../../util/DialogUtil');
const { PROJECT_TYPE } = require('../../../store/Constants');
const showMenu = require('../../menu/Menu');

const styles = {
    appBar: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
    },
    contentDiv: {
        position: 'absolute',
        top: '70px',
        left: '10px',
        right: '10px',
        bottom: '10px',
    },
    optionsDiv: {
        padding: '10px'
    },
    actionButtonsDiv: {
        padding: '10px',
        position: 'relative',
        width: '90px',
        margin: '0 0 0 auto',
    }
};


/**
 * React component that shows whole setup screen.
 */
class SetupScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'New Project',
            path: '',
            type: PROJECT_TYPE.OFFLINE_PCA,
            hasConstantSampling: false,
            sampling: 10,
            error: ''
        };
    }

    handleNameTextChange(event, newValue) {
        this.setState({
            name: newValue,
            error: ''
        });
    }

    handleDirectoryTextChange(event, newValue) {
        this.setState({
            path: newValue,
            error: ''
        });
    }

    handleTypeChange({type, sampling, hasConstantSampling}) {
        this.setState({
            type: type,
            sampling: sampling,
            hasConstantSampling: hasConstantSampling,
            error: ''
        });
    }

    handleOpenFolderClick() {
        DialogUtil.showOpenCreateDirDialog()
            .then((path) => {
                this.setState({
                    path: path,
                    error: ''
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleCreateClick() {
        const { name, path, hasConstantSampling, sampling } = this.state;

        if (!name) {
            this.setState({
                error: 'Project name is required!'
            });
            return;
        }

        if (!path) {
            this.setState({
                error: 'Project directory is required!'
            });
            return;
        }

        if (hasConstantSampling && sampling <= 3) {
            this.setState({
                error: 'Dimension must be greater than 3!'
            });
            return;
        }

        this.props.onCreateClick(this.state);
    }

    onSnackbarClose() {
        this.setState({
            error: ''
        });
    }

    render() {
        const { name, path, type, hasConstantSampling, sampling, error } = this.state;

        showMenu();

        return (
            <div>

                <AppBar
                    style={styles.appBar}
                    title='New Project'
                    iconElementLeft={
                        <IconButton>
                            <IconBack onTouchTap={this.props.onBackClick}/>
                        </IconButton>
                    }
                    iconElementRight={
                        <IconMenu
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            iconButtonElement={
                                <IconButton><IconMore /></IconButton>
                            }>

                            <MenuItem primaryText='Help' onTouchTap={() => HelpUtil.showHelp()}/>
                        </IconMenu>
                    }/>

                <div style={styles.contentDiv}>

                    <Card>
                        <div style={styles.optionsDiv}>

                            <TextField
                                id='project-name'
                                floatingLabelText='Name'
                                value={name}
                                onChange={this.handleNameTextChange.bind(this)}/>

                            <br/>
                            <TextField
                                id='project-path'
                                floatingLabelText='Directory'
                                value={path}
                                onChange={this.handleDirectoryTextChange.bind(this)}/>
                            <IconButton
                                tooltip='Find directory'
                                onTouchTap={this.handleOpenFolderClick.bind(this)}>
                                <IconOpenFolder/>
                            </IconButton>

                            <br/>
                            <ProjectTypeSelector
                                type={type}
                                hasConstantSampling={hasConstantSampling}
                                sampling={sampling}
                                onTypeChange={this.handleTypeChange.bind(this)}/>
                        </div>

                        <div style={styles.actionButtonsDiv}>
                            <FlatButton
                                label='Create'
                                onTouchTap={this.handleCreateClick.bind(this)}/>
                        </div>
                    </Card>

                    <Snackbar
                        open={error !== ''}
                        message={error}
                        autoHideDuration={3000}
                        onRequestClose={this.onSnackbarClose.bind(this)}/>
                </div>
            </div>
        );
    }
}

SetupScreen.propTypes = {
    onCreateClick: React.PropTypes.func.isRequired,
    onBackClick: React.PropTypes.func.isRequired,
};

module.exports = SetupScreen;
