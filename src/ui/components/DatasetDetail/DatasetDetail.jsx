"use strict";

const React = require('react');

const DatasetInfo = require('./DatasetInfo.jsx');
const StreamEditor = require('./StreamEditor.jsx');
const DatasetEntries = require('./DatasetEntries.jsx');

const update = require('immutability-helper');
const DatasetService = require('../../../service/DatasetService');
const DialogService = require('../../../service/DialogService');
const FileService = require('../../../service/FileService');

class DatasetDetail extends React.Component {

    constructor(props) {
        super(props);

        const { dataset, datasetEntries, datasetStream } = props;
        // add also current dataset entries
        // make sure you do not edit them directly
        const entries = {};
        for (let i = 0; i < datasetEntries.length; i++) {
            const entry = datasetEntries[i];
            entries[entry.id] = entry;
        }

        this.state = {
            dataset: Object.assign({}, dataset),
            entries: entries,
            stream: datasetStream.slice(),
            update: 0
        };
    }

    handleDatasetChange(key, value) {
        const newDataset = Object.assign({}, this.state.dataset, {
            [key]: value
        });
        this.setState({
            dataset: newDataset
        });
    }

    handleStreamTransformationChange(transformation) {
        this.setState({
            dataset: Object.assign({}, this.state.dataset, {
                transformationType: transformation.type,
                transformationValue: transformation.value
            })
        });
    }

    handleEntryClick(id) {
        this.props.onEntryClick(this.props.dataset.id, id);
    }

    handleEntryChange(id, index, value) {
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

    handleLoadDataClick() {
        DialogService.showOpenFileDialog()
            .then((filePath) => {
                return FileService.readValuesFromFile(filePath, true);
            })
            .then((values) => {
                const addedEntryIds = Object.keys(this.state.entries).map(id => parseInt(id));
                addedEntryIds.push(this.props.lastEntryId);
                return DatasetService.valuesToEntries(addedEntryIds, values);
            })
            .then((entries) => {
                this.setState({
                    entries: Object.assign({}, this.state.entries, entries),
                    update: this.state.update + 1
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleLoadStreamClick() {
        DialogService.showOpenFileDialog()
            .then((filePath) => {
                return FileService.readValuesFromFile(filePath, false);
            })
            .then((values) => {
                console.log('loaded stream', values.length);
                if (values.length > 0) {
                    this.setState({
                        stream: this.state.stream.concat(values),
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handlePlotClick() {
        console.error('TODO : handlePlotClick');
    }

    handleSaveClick() {
        const { dataset, entries, stream } = this.state;

        const entryIds = Object.keys(entries).filter(id => {
            const entry = entries[id];
            return entry !== undefined && entry !== null;
        }).map(id => parseInt(id));

        let changes = {
            dataset: Object.assign({}, dataset, {
                entries: entryIds
            }),
            entries: this.state.entries,
            stream: stream
        };

        this.props.onSaveClick(this.props.dataset.id, changes);
    }

    handleDeleteClick() {
        this.props.onDeleteClick(this.props.dataset.id);
    }

    handleCloseClick() {
        this.props.onCloseClick(this.props.dataset.id);
    }

    render() {
        // prepare data for UI
        const dataset = Object.assign({}, this.props.dataset, this.state.dataset);
        const entries = Object.keys(this.state.entries)
            .map(id => this.state.entries[id])
            .filter(entry => entry !== undefined && entry !== null);
        const transformation = {
            type: dataset.transformationType,
            value: dataset.transformationValue
        };

        const content = [];

        content.push(
            <DatasetInfo
                key='dataset-info'
                dataset={dataset}
                onDatasetChange={this.handleDatasetChange.bind(this)}
                onDeleteClick={this.handleDeleteClick.bind(this)}
                onCloseClick={this.handleCloseClick.bind(this)}
                onLoadDataClick={this.handleLoadDataClick.bind(this)}
                onLoadStreamClick={this.handleLoadStreamClick.bind(this)}
                onSaveClick={this.handleSaveClick.bind(this)}/>
        );

        if (this.state.stream.length > 0) {
            content.push(
                <div
                    key='dataset-stream'
                    style={{paddingTop: '10px'}}>

                    <StreamEditor
                        stream={this.state.stream}
                        transformation={transformation}
                        onTransformationChange={this.handleStreamTransformationChange.bind(this)}/>
                </div>
            );
        }

        if (entries.length > 0) {
            content.push(
                <div
                    key='dataset-entries'
                    style={{paddingTop: '10px'}}>

                    <DatasetEntries
                        entries={entries}
                        color={dataset.color}
                        onEntryClick={this.handleEntryClick.bind(this)}
                        onEntryChange={this.handleEntryChange.bind(this)}
                        onPlotClick={this.handlePlotClick.bind(this)}/>
                </div>
            );
        }

        return (
            <div>{ content }</div>
        );
    }
}

DatasetDetail.propTypes = {
    // dataset object
    dataset: React.PropTypes.object.isRequired,
    // array of dataset entries
    datasetEntries: React.PropTypes.array.isRequired,
    // array of stream values
    datasetStream: React.PropTypes.array.isRequired,
    // last used entry ID
    lastEntryId: React.PropTypes.number.isRequired,
    // callbacks
    onSaveClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
    onEntryClick: React.PropTypes.func.isRequired
};

module.exports = DatasetDetail;
