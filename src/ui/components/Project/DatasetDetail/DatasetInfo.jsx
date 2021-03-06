"use strict";

const React = require('react');
const { Card, CardActions, CardText } = require('material-ui/Card');
const IconButton = require('material-ui/IconButton').default;
const IconClose = require('material-ui/svg-icons/navigation/close').default;
const IconDelete = require('material-ui/svg-icons/action/delete').default;
const IconMenu = require('material-ui/IconMenu').default;
const IconMore = require('material-ui/svg-icons/navigation/more-vert').default;
const IconSave = require('material-ui/svg-icons/content/save').default;
const MenuItem = require('material-ui/MenuItem').default;
const TextField = require('material-ui/TextField').default;

const AddEntryDialog = require('./AddEntryDialog.jsx');
const ColorPicker = require('../../Common/ColorPicker');


/**
 * Shows basic dataset information.
 */
class DatasetInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openAddDialog: false
        };
    }

    openAddDialog() {
        this.setState({
            openAddDialog: true
        });
    }

    closeAddDialog() {
        this.setState({
            openAddDialog: false
        });
    }

    handleAddEntry(entryValue) {
        this.setState({
            openAddDialog: false
        });
        this.props.onAddEntry(entryValue);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.dataset !== nextProps.dataset
            || this.props.included !== nextProps.included
            || this.state.openAddDialog !== nextState.openAddDialog;
    }

    render() {
        const {
            dataset, included, single, sampling,
            onSaveClick, onDeleteClick, onCloseClick,
            onDatasetChange, onLoadClick, onClearClick, onIncludeChange, onProjectedOnlyChange
        } = this.props;

        let actionIncludeExclude = null;
        let actionProjectedOnly = null;
        if (!single) {
            if (included) {
                actionIncludeExclude = (
                    <MenuItem
                        primaryText="Exclude"
                        onTouchTap={() => onIncludeChange(false)}/>
                );
            } else {
                actionIncludeExclude = (
                    <MenuItem
                        primaryText="Include"
                        onTouchTap={() => onIncludeChange(true)}/>
                );
            }

            if (dataset.projectedOnly) {
                actionProjectedOnly = (
                    <MenuItem
                        primaryText="Disable Project Only"
                        onTouchTap={() => onProjectedOnlyChange(false)}/>
                );
            } else {
                actionProjectedOnly = (
                    <MenuItem
                        primaryText="Project Only"
                        onTouchTap={() => onProjectedOnlyChange(true)}/>
                );
            }
        }

        return (
            <Card>
                <CardActions>
                    <ColorPicker
                        key={`editable-dataset-avatar-${dataset.id}`}
                        value={dataset.color}
                        letter={dataset.name.substr(0, 1)}
                        onChange={(newValue) => {
                            onDatasetChange('color', newValue);
                        }}/>

                    <TextField
                        style={{
                            width: '300px'
                        }}
                        key={`editable-dataset-name-${dataset.id}`}
                        floatingLabelText={"Name"}
                        defaultValue={dataset.name}
                        onChange={(event, newValue) => {
                            onDatasetChange('name', newValue);
                        }}/>
                </CardActions>

                <CardText>
                    <TextField
                        key={`editable-dataset-desc-${dataset.id}`}
                        floatingLabelText={"Description"}
                        defaultValue={dataset.desc}
                        multiLine={true}
                        underlineShow={true}
                        fullWidth={true}
                        onChange={(event, newValue) => {
                            onDatasetChange('desc', newValue);
                        }}/>
                </CardText>

                <CardActions
                    style={{
                        position: 'relative',
                        width: (single) ? '120px' : '230px',
                        right: 0,
                        margin: '0 0 0 auto',
                    }}>

                    <IconButton
                        tooltip="Save"
                        onTouchTap={onSaveClick}>
                        <IconSave/>
                    </IconButton>

                    {
                        !single ? (
                            <IconButton
                                tooltip="Delete"
                                onTouchTap={onDeleteClick}>
                                <IconDelete color={'#ae0000'}/>
                            </IconButton>
                        ): null
                    }

                    {
                        !single ? (
                            <IconButton
                                tooltip="Close"
                                onTouchTap={onCloseClick}>
                                <IconClose/>
                            </IconButton>
                        ): null
                    }

                    <IconMenu
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        iconButtonElement={
                            <IconButton><IconMore /></IconButton>
                        }>

                        <MenuItem
                            primaryText="Load"
                            onTouchTap={onLoadClick}/>

                        {
                            sampling ? (
                                <MenuItem
                                    primaryText="Add"
                                    onTouchTap={this.openAddDialog.bind(this)}/>
                            ): null
                        }

                        <MenuItem
                            primaryText="Clear"
                            onTouchTap={onClearClick}/>

                        { actionProjectedOnly }
                        { actionIncludeExclude }
                    </IconMenu>

                    {
                        sampling ? (
                            <AddEntryDialog
                                open={this.state.openAddDialog}
                                sampling={sampling}
                                onAdd={this.handleAddEntry.bind(this)}
                                onClose={this.closeAddDialog.bind(this)}/>
                        ) : null
                    }
                </CardActions>
            </Card>
        );
    }
}

DatasetInfo.propTypes = {
    /* dataset object */
    dataset: React.PropTypes.object.isRequired,
    included: React.PropTypes.bool.isRequired,
    /* indicator whether this project can have only 1 dataset */
    single: React.PropTypes.bool.isRequired,
    /* size of the sampling window (if it is constant) */
    sampling: React.PropTypes.number,
    /* callbacks */
    onDatasetChange: React.PropTypes.func.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
    onLoadClick: React.PropTypes.func.isRequired,
    onAddEntry: React.PropTypes.func,
    onClearClick: React.PropTypes.func.isRequired,
    onIncludeChange: React.PropTypes.func.isRequired,
    onProjectedOnlyChange: React.PropTypes.func.isRequired,
};

module.exports = DatasetInfo;
