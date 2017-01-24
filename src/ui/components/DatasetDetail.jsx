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

const DatasetService = require('../../service/DatasetService');
const DialogService = require('../../service/DialogService');
const FileService = require('../../service/FileService');

class DatasetDetail extends React.Component {

    constructor(props) {
        super(props);

        // add also current dataset entries
        // make sure you do not edit them directly
        const entries = {};
        for(let i = 0; i < props.datasetEntries.length; i++) {
            const entry = props.datasetEntries[i];
            entries[entry.id] = entry;
        }

        this.state = {
            dataset: {},
            entries: entries,
            update: 0
        };
        this.changed = false;
        console.log('CONSTRUCTOR', props, this.state);
    }

    onDatasetChange(key, value) {
        this.state.dataset[key] = value;
        this.changed = true;
    }

    onEntryChange(key, value) {
        console.error('TODO onEntryChange');
        // FIXME
        // if (value === null) {
        //     delete this.changes.entries[key];
        // } else {
        //     this.changes.entries[key] = value;
        // }
    }

    onLoadDataClicked() {
        DialogService.showOpenFileDialog()
            .then((filePath) => {
                return FileService.readValuesFromFile(filePath);
            })
            .then((values) => {
                const addedEntryIds = Object.keys(this.state.entries).map(v => parseInt(v));
                addedEntryIds.push(this.props.lastEntryId);
                return DatasetService.valuesToEntries(addedEntryIds, values);
            })
            .then((entries) => {
                console.log('entries loaded', entries);
                this.changed = true;
                this.setState({
                    entries: Object.assign({}, this.state.entries, entries),
                    update: this.state.update + 1
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    onLoadStreamClicked() {
        console.error('TODO : onLoadStreamClicked');
    }

    trySave() {
        console.log('trySave');
        if (this.changed) {
            console.log('trySave - exec');

            this.state.dataset.entries = Object.keys(this.state.entries).filter(id => {
                const entry = this.state.entries[id];
                return entry !== undefined && entry !== null;
            });

            this.props.onSaveClick(this.props.dataset.id, {
                dataset: this.state.dataset,
                datasetEntries: this.state.entries
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // re-render if update is allowed OR if nothing was changed
        return nextState.update !== this.state.update || !this.changed;
    }

    render() {
        // prepare data for UI
        const dataset = Object.assign({}, this.props.dataset, this.state.dataset);
        const entries = Object.keys(this.state.entries)
                                .map(id => this.state.entries[id])
                                .filter(entry => entry !== undefined && entry !== null);
        console.log('RENDER', dataset, entries);
        const {
            onDeleteClick,
            onCloseClick,
            onEntryClick
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
                            title="Spectrum"
                            entries={entries}
                            onPlotClick={(p) => {
                                console.error('TODO PLOT CLICK:', p);
                            }}/>
                    </CardMedia>

                    <CardMedia>
                        <EntryList
                            entries={entries}
                            onEntryClick={(entryId) => {
                                onEntryClick(dataset.id, entryId)
                            }}
                            onChange={(id, index, value) => {
                                this.onEntryChange(`${id}/${index}`, value);
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
                                onTouchTap={this.onLoadDataClicked.bind(this)}/>
                            <MenuItem
                                primaryText="Load Stream"
                                onTouchTap={this.onLoadStreamClicked.bind(this)}/>
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
