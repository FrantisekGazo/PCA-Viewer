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

        // make copy
        const entryMap = {};
        for (let i = 0; i < props.datasetEntries.length; i++) {
            const entry = props.datasetEntries[i];
            entryMap[entry.id] = entry;
        }
        const dataset = Object.assign({}, props.dataset);
        dataset.entries = props.dataset.entries.slice();

        this.state = {
            dataset,
            entryMap,
            entries: props.datasetEntries.slice(), // make copy
            update: 0
        };
        this.changed = false;
    }

    onDatasetChange(key, value) {
        this.state.dataset[key] = value;
        this.changed = true;
    }

    onEntryChange(key, value) {
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
                const dataset = Object.assign({}, this.state.dataset); // make copy
                return DatasetService.valuesToEntries(dataset, values, this.props.lastEntryId);
            })
            .then(({dataset, entries}) => {

                const entryMap = {};
                for (let i = 0; i < this.state.entries.length; i++) {
                    const entry = this.state.entries[i];
                    entryMap[entry.id] = entry;
                }
                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
                    entryMap[entry.id] = entry;
                }

                this.changed = true;
                this.setState({
                    dataset: dataset,
                    entryMap: entryMap,
                    entries: entries.concat(this.state.entries),
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

    shouldComponentUpdate(nextProps, nextState) {
        // re-render if different dataset will be shown
        return nextProps.dataset.id !== this.props.dataset.id
            // re-render if update is allowed
            || nextState.update !== this.state.update
            // re-render if nothing was changed
            || !this.changed;
    }

    componentWillReceiveProps(nextProps) {
        // set state if different dataset will be shown
        if (nextProps.dataset.id !== this.state.dataset.id) {

            const entryMap = {};
            for (let i = 0; i < nextProps.datasetEntries.length; i++) {
                const entry = nextProps.datasetEntries[i];
                entryMap[entry.id] = entry;
            }
            const dataset = Object.assign({}, nextProps.dataset);
            dataset.entries = nextProps.dataset.entries.slice();
            this.state = {
                dataset,
                entryMap,
                entries: nextProps.datasetEntries.slice(), // make copy
                update: 0
            };
        }
    }

    render() {
        const {
            dataset,
            entries
        } = this.state;
        const {
            onSaveClick,
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
            <div key={`dataset-${dataset.id}`}>
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
                            onTouchTap={() => {
                                if (this.changed) {
                                    onSaveClick(dataset.id, {
                                        dataset: this.state.dataset,
                                        datasetEntries: this.state.entryMap
                                    })
                                }
                            }}>
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
