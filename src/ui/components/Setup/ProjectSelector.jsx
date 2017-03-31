"use strict";

const React = require('react');
const { Card } = require('material-ui/Card');
const TextField = require('material-ui/TextField').default;
const IconButton = require('material-ui/IconButton').default;
const IconOpenFolder = require('material-ui/svg-icons/file/folder-open').default;
const FlatButton = require('material-ui/FlatButton').default;

const ProjectTypeSelector = require('./ProjectTypeSelector.jsx');
const DialogUtil = require('../../../util/DialogUtil');
const { PROJECT_TYPE } = require('../../../store/Constants');


const styles = {
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
 * React component that shows project selector card.
 */
class ProjectSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'New Project',
            path: '',
            type: PROJECT_TYPE.OFFLINE_PCA,
            hasConstantSampling: false,
            sampling: 10
        };
    }

    handleNameTextChange(event, newValue) {
        this.setState({
            name: newValue
        });
        this.props.onShowError('');
    }

    handleDirectoryTextChange(event, newValue) {
        this.setState({
            path: newValue
        });
        this.props.onShowError('');
    }

    handleTypeChange({type, sampling, hasConstantSampling}) {
        this.setState({
            type: type,
            sampling: sampling,
            hasConstantSampling: hasConstantSampling
        });
        this.props.onShowError('');
    }

    handleOpenFolderClick() {
        DialogUtil.showOpenCreateDirDialog()
            .then((path) => {
                this.setState({
                    path: path,
                });
                this.props.onShowError('');
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleCreateClick() {
        const {name, path, hasConstantSampling, sampling} = this.state;

        if (!name) {
            this.props.onShowError('Project name is required!');
            return;
        }

        if (!path) {
            this.props.onShowError('Project directory is required!');
            return;
        }

        if (hasConstantSampling && sampling <= 3) {
            this.props.onShowError('Dimension must be greater than 3!');
            return;
        }

        this.props.onCreateClick(this.state);
    }

    render() {
        const { name, path, type, hasConstantSampling, sampling } = this.state;

        return (
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
        );
    }
}

ProjectSelector.propTypes = {
    onCreateClick: React.PropTypes.func.isRequired,
    onBackClick: React.PropTypes.func.isRequired,
    onShowError: React.PropTypes.func.isRequired,
};

module.exports = ProjectSelector;
