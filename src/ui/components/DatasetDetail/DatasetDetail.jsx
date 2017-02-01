"use strict";

const React = require('react');

const DatasetInfo = require('./DatasetInfo.jsx');
const StreamEditor = require('./StreamEditor.jsx');
const DatasetEntries = require('./DatasetEntries.jsx');

const update = require('immutability-helper');
const DatasetService = require('../../../service/DatasetService');
const DialogService = require('../../../service/DialogService');
const FileService = require('../../../service/FileService');
const StreamService = require('../../../service/StreamService');

class DatasetDetail extends React.Component {

    constructor(props) {
        super(props);

        const { dataset, entries, stream, transformedStream } = props;
        // add also current dataset entries
        // make sure you do not edit them directly
        const entriesMap = {};
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            entriesMap[entry.id] = entry;
        }

        this.state = {
            dataset: Object.assign({}, dataset),
            entries: entriesMap,
            stream: stream.slice(),
            transformedStream: transformedStream.slice(),
            transformation: {
                type: dataset.transformationType,
                value: dataset.transformationValue
            },
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
                if (values === null || values.lenght === 0) {
                    return Promise.reject(Error('Loaded stream is empty!'));
                }

                const { stream, transformation } = this.state;
                const newStream = stream.concat(values);
                console.log('new stream', newStream.length);

                return StreamService.transformStream(newStream, transformation)
                    .then((newTansfStream) => {
                        console.log('new transformed stream', newTansfStream.length);

                        this.setState({
                            stream: newStream,
                            transformedStream: newTansfStream
                        });
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleStreamTransformationChange(transformation) {
        console.log('changing transformation to', transformation);
        return StreamService.transformStream(this.state.stream, transformation)
            .then((newTansfStream) => {
                console.log('new transformed stream', newTansfStream.length);

                this.setState({
                    transformation: transformation,
                    transformedStream: newTansfStream
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handlePlotClick() {
        console.error('TODO : handlePlotClick');
    }

    handleSaveClick() {
        const { dataset, entries, stream, transformedStream, transformation } = this.state;

        const entryIds = Object.keys(entries).filter(id => {
            const entry = entries[id];
            return entry !== undefined && entry !== null;
        }).map(id => parseInt(id));

        let changes = {
            dataset: Object.assign({}, dataset, {
                entries: entryIds,
                transformationType: transformation.type,
                transformationValue: transformation.value
            }),
            entries: entries,
            stream: stream,
            transformedStream: transformedStream
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
                        transformedStream={this.state.transformedStream}
                        transformation={this.state.transformation}
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
    entries: React.PropTypes.array.isRequired,
    // array of stream values
    stream: React.PropTypes.array.isRequired,
    // array of transformed stream values
    transformedStream: React.PropTypes.array.isRequired,
    // last used entry ID
    lastEntryId: React.PropTypes.number.isRequired,
    // callbacks
    onSaveClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
    onEntryClick: React.PropTypes.func.isRequired
};

module.exports = DatasetDetail;
