"use strict";

const React = require('react');
const { Card, CardActions, CardHeader, CardMedia, CardText } = require('material-ui/Card');
const IconButton = require('material-ui/IconButton').default;
const IconClose = require('material-ui/svg-icons/navigation/close').default;
const IconDelete = require('material-ui/svg-icons/action/delete').default;
const IconMenu = require('material-ui/IconMenu').default;
const IconMore = require('material-ui/svg-icons/navigation/more-vert').default;
const IconSave = require('material-ui/svg-icons/content/save').default;
const MenuItem = require('material-ui/MenuItem').default;
const TextField = require('material-ui/TextField').default;

const ColorPicker = require('../components/ColorPicker/components/ColorPicker.jsx');
const EntryList = require('./EntryList.jsx');
const EntrySpectrumPlot = require('./EntrySpectrumPlot.jsx');

const DatasetDetail = ({dataset, datasetEntries, onSaveClick, onDeleteClick, onCloseClick, onLoadEntriesClick, onEntryClick}) => {
    let changes = {
        dataset: {},
        entries: {}
    };

    let entryInfo = null;
    if (datasetEntries.length > 0) {
        entryInfo = (
            <Card style={{
                marginTop: '10px'
            }}>
                <CardHeader title='Entries:'/>

                <CardMedia>
                    <EntrySpectrumPlot
                        title="Spectrum"
                        entries={datasetEntries}
                        onPlotClick={(p) => {
                            console.error('TODO PLOT CLICK:', p);
                        }}/>
                </CardMedia>

                <CardMedia>
                    <EntryList
                        entries={datasetEntries}
                        onEntryClick={(entryId) => {
                            onEntryClick(dataset.id, entryId)
                        }}
                        onChange={(id, index, value) => {
                            if (value === null) {
                                delete changes.entries[`${id}/${index}`];
                            } else {
                                changes.entries[`${id}/${index}`] = value;
                            }
                        }}/>
                </CardMedia>
            </Card>
        );
    }


    return (
        <div>
            <Card>
                <CardActions>
                    <ColorPicker
                        key={`editable-dataset-avatar-${dataset.id}`}
                        value={dataset.color}
                        letter={dataset.name.substr(0, 1)}
                        onChange={(newValue) => {
                            if (newValue === dataset.color) {
                                delete changes.dataset.color;
                            } else {
                                changes.dataset.color = newValue;
                            }
                        }}/>

                    <TextField
                        style={{
                            width: '300px'
                        }}
                        key={`editable-dataset-name-${dataset.id}`}
                        floatingLabelText={"Name"}
                        defaultValue={dataset.name}
                        onChange={(event, newValue) => {
                            if (newValue === dataset.name) {
                                delete changes.dataset.name;
                            } else {
                                changes.dataset.name = newValue;
                            }
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
                            if (newValue === dataset.desc) {
                                delete changes.dataset.desc;
                            } else {
                                changes.dataset.desc = newValue;
                            }
                        }}/>
                </CardText>

                <CardActions
                        style={{
                            position: 'relative',
                            width: '230px',
                            right: 0,
                            margin: '0 0 0 auto',
                        }}>

                    <IconButton
                        tooltip="Save"
                        onTouchTap={() => onSaveClick(dataset.id, changes)}>
                        <IconSave/>
                    </IconButton>

                    <IconButton
                        tooltip="Delete"
                        onTouchTap={() => onDeleteClick(dataset.id)}>
                        <IconDelete color={'#ae0000'}/>
                    </IconButton>

                    <IconButton
                        tooltip="Close"
                        onTouchTap={() => onCloseClick(dataset.id)}>
                        <IconClose/>
                    </IconButton>

                    <IconMenu
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        iconButtonElement={
                            <IconButton><IconMore /></IconButton>
                        }>

                        <MenuItem
                            primaryText="Load Data"
                            onTouchTap={() => onLoadEntriesClick(dataset.id)}/>
                        <MenuItem
                            primaryText="Load Stream"
                            onTouchTap={() => console.error('IMPLEMENT LOAD STREAM')}/>
                    </IconMenu>
                </CardActions>
            </Card>

            { entryInfo }
        </div>
    );
};

DatasetDetail.propTypes = {
    dataset: React.PropTypes.object.isRequired,
    datasetEntries: React.PropTypes.array.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
    onLoadEntriesClick: React.PropTypes.func.isRequired,
    onEntryClick: React.PropTypes.func.isRequired
};

module.exports = DatasetDetail;
