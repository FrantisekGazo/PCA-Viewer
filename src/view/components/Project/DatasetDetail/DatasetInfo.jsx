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

const ColorPicker = require('../../Common/ColorPicker');


class DatasetInfo extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.dataset !== nextProps.dataset
            || this.props.included !== nextProps.included;
    }

    render() {
        const {
            dataset,
            included,
            single,
            onSaveClick,
            onDeleteClick,
            onCloseClick,
            onDatasetChange,
            onLoadClick,
            onIncludeChange
        } = this.props;

        let extraAction = null;
        if (!single) {
            if (included) {
                extraAction = (
                    <MenuItem
                        primaryText="Exclude"
                        onTouchTap={() => onIncludeChange(false)}/>
                );
            } else {
                extraAction = (
                    <MenuItem
                        primaryText="Include"
                        onTouchTap={() => onIncludeChange(true)}/>
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
                        width: (single) ? '170px' : '230px',
                        right: 0,
                        margin: '0 0 0 auto',
                    }}>

                    <IconButton
                        tooltip="Save"
                        onTouchTap={onSaveClick}>
                        <IconSave/>
                    </IconButton>

                    <IconButton
                        tooltip="Delete"
                        onTouchTap={onDeleteClick}>
                        <IconDelete color={'#ae0000'}/>
                    </IconButton>

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
                        { extraAction }
                    </IconMenu>
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
    /* callbacks */
    onDatasetChange: React.PropTypes.func.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
    onLoadClick: React.PropTypes.func.isRequired,
    onIncludeChange: React.PropTypes.func.isRequired,
};

module.exports = DatasetInfo;
