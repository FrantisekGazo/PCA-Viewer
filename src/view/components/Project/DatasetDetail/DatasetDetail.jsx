"use strict";

const React = require('react');

const DatasetInfo = require('./DatasetInfo.jsx');
const StreamEditor = require('./StreamEditor.jsx');
const DatasetEntries = require('./DatasetEntries.jsx');

const DatasetService = require('../../../../service/DatasetService');
const DialogService = require('../../../../service/DialogService');
const FileService = require('../../../../service/FileService');
const StreamService = require('../../../../service/StreamService');


class DatasetDetail extends React.Component {

    constructor(props) {
        super(props);

        const { dataset, included, entries, stream, transformedStream } = props;

        this.state = {
            included: included,
            dataset: Object.assign({}, dataset),
            entries: entries.slice(),
            stream: stream.slice(),
            transformedStream: transformedStream.slice(),
            transformation: {
                type: dataset.transformationType,
                value: dataset.transformationValue
            },
            update: 0
        };
    }

    handleIncludeChange(value) {
        this.setState({
            included: value
        });
    }

    handleDatasetChange(key, value) {
        const newDataset = Object.assign({}, this.state.dataset, {
            [key]: value
        });
        this.setState({
            dataset: newDataset
        });
    }

    handleEntryAdd(entry) {
        this.state.entries.push(entry);
        this.setState({
            update: this.state.update + 1
        });
    }

    handleLoadDataClick() {
        DialogService.showOpenFileDialog()
            .then((filePath) => {
                return FileService.readValuesFromFile(filePath, true);
            })
            .then((values) => {
                const addedEntryIds = this.state.entries.map(entry => entry.id);
                addedEntryIds.push(this.props.lastEntryId);
                return DatasetService.valuesToEntries(this.state.dataset.id, addedEntryIds, values);
            })
            .then((entries) => {
                this.setState({
                    entries: this.state.entries.concat(entries),
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

    handleStreamSamplingChange(sampling) {
        console.log('changing sampling to', sampling);
        return StreamService.sampleStream(this.state.transformedStream, sampling)
            .then((sampledValues) => {
                console.error('change this to point to the transformedStream instead of duplication the values'); //TODO
                console.log('sampled stream', sampledValues.length);
                const addedEntryIds = this.state.entries.map(entry => entry.id);
                addedEntryIds.push(this.props.lastEntryId);
                return DatasetService.valuesToEntries(this.state.dataset.id, addedEntryIds, sampledValues);
            })
            .then((entries) => {
                this.setState({
                    entries: this.state.entries.concat(entries),
                    update: this.state.update + 1
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleSaveClick() {
        const { dataset, included, entries, stream, transformedStream, transformation } = this.state;

        let changes = {
            included: included,
            dataset: Object.assign({}, dataset, {
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
        const entries = this.state.entries;

        const content = [];

        content.push(
            <DatasetInfo
                key='dataset-info'
                dataset={dataset}
                included={this.state.included}
                onIncludeChange={this.handleIncludeChange.bind(this)}
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
                        onTransformationChange={this.handleStreamTransformationChange.bind(this)}
                        sampling={dataset.sampling}
                        onSamplingChange={this.handleStreamSamplingChange.bind(this)}/>
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
                        selectedEntryIds={this.props.selectedEntryIds}
                        color={dataset.color}
                        onEntrySelected={this.props.onEntrySelected}
                        onEntryAdd={this.handleEntryAdd.bind(this)}/>
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
    included: React.PropTypes.bool.isRequired,
    // array of dataset entries
    entries: React.PropTypes.array.isRequired,
    selectedEntryIds: React.PropTypes.array.isRequired,
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
    onEntrySelected: React.PropTypes.func.isRequired
};

module.exports = DatasetDetail;
