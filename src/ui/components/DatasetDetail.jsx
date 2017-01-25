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

const update = require('immutability-helper');
const DatasetService = require('../../service/DatasetService');
const DialogService = require('../../service/DialogService');
const FileService = require('../../service/FileService');

class DatasetDetail extends React.Component {

    constructor(props) {
        super(props);

        // add also current dataset entries
        // make sure you do not edit them directly
        const entries = {};
        for (let i = 0; i < props.datasetEntries.length; i++) {
            const entry = props.datasetEntries[i];
            entries[entry.id] = entry;
        }

        this.state = {
            dataset: {},
            entries: entries,
            update: 0
        };
    }

    onDatasetChange(key, value) {
        const newDataset = Object.assign({}, this.state.dataset, {
            [key]: value
        });
        this.setState({
           dataset: newDataset
        });
    }

    onEntryClick(id) {
        this.props.onEntryClick(this.props.dataset.id, id);
    }

    onEntryChange(id, index, value) {
        let updatedEntries;
        if (index === -1) {
            updatedEntries = update(this.state.entries, {
                [id]: {
                    name: {$set: value}
                }
            });
        } else {
            updatedEntries = update(this.state.entries, {
                [id]: {
                    value: {
                        [index]: {$set: value}
                    }
                }
            });
        }
        this.setState({
            entries: updatedEntries
        });
    }

    onLoadDataClick() {
        DialogService.showOpenFileDialog()
            .then((filePath) => {
                return FileService.readValuesFromFile(filePath, true);
            })
            .then((values) => {
                console.log('values loaded', values.length, this);
                const addedEntryIds = Object.keys(this.state.entries).map(id => parseInt(id));
                addedEntryIds.push(this.props.lastEntryId);
                return DatasetService.valuesToEntries(addedEntryIds, values);
            })
            .then((entries) => {
                console.log('entries loaded', entries);
                this.setState({
                    entries: Object.assign({}, this.state.entries, entries),
                    update: this.state.update + 1
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    onLoadStreamClick() {
        console.error('TODO : onLoadStreamClick');
    }

    onPlotClick() {
        console.error('TODO : onPlotClick');
    }

    trySave() {
        this.state.dataset.entries = Object.keys(this.state.entries).filter(id => {
            const entry = this.state.entries[id];
            return entry !== undefined && entry !== null;
        }).map(id => parseInt(id));

        this.props.onSaveClick(this.props.dataset.id, {
            dataset: this.state.dataset,
            datasetEntries: this.state.entries
        })
    }

    render() {
        // prepare data for UI
        const dataset = Object.assign({}, this.props.dataset, this.state.dataset);
        const entries = Object.keys(this.state.entries)
                                .map(id => this.state.entries[id])
                                .filter(entry => entry !== undefined && entry !== null);
        const {
            onDeleteClick,
            onCloseClick
        } = this.props;

        let entryInfo = null;
        if (entries.length > 0) {
            entryInfo = (
                <Card style={{
                    marginTop: '10px'
                }}>
                    <CardHeader title='Entries:'/>

                    <CardMedia>
                        <EntrySpectrumPlot
                            defaultColor={dataset.color}
                            entries={entries}
                            onPlotClick={this.onPlotClick.bind(this)}/>
                    </CardMedia>

                    <CardMedia>
                        <EntryList
                            entries={entries}
                            onEntryClick={this.onEntryClick.bind(this)}
                            onChange={this.onEntryChange.bind(this)}/>
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
                                this.onDatasetChange('color', newValue);
                            }}/>

                        <TextField
                            style={{
                                width: '300px'
                            }}
                            key={`editable-dataset-name-${dataset.id}`}
                            floatingLabelText={"Name"}
                            defaultValue={dataset.name}
                            onChange={(event, newValue) => {
                                this.onDatasetChange('name', newValue);
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
                                this.onDatasetChange('desc', newValue);
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
                            onTouchTap={this.trySave.bind(this)}>
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
                                onTouchTap={this.onLoadDataClick.bind(this)}/>
                            <MenuItem
                                primaryText="Load Stream"
                                onTouchTap={this.onLoadStreamClick.bind(this)}/>
                        </IconMenu>
                    </CardActions>
                </Card>

                { entryInfo }
            </div>
        );
    }
}

DatasetDetail.propTypes = {
    dataset: React.PropTypes.object.isRequired,
    datasetEntries: React.PropTypes.array.isRequired,
    lastEntryId: React.PropTypes.number.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
    onEntryClick: React.PropTypes.func.isRequired
};

module.exports = DatasetDetail;
