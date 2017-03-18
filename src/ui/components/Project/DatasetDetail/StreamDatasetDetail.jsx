"use strict";

const React = require('react');

const DatasetInfo = require('./DatasetInfo.jsx');
const StreamEditor = require('./StreamEditor.jsx');

const DatasetUtil = require('../../../../util/DatasetUtil');
const DialogUtil = require('../../../../util/DialogUtil');
const FileUtil = require('../../../../util/FileUtil');
const StreamUtil = require('../../../../util/StreamUtil');


/**
 * Shows dataset detail of a dataset with variable sampling.
 */
class StreamDatasetDetail extends React.Component {

    constructor(props) {
        super(props);

        const { dataset, included, stream, transformedStream } = props;

        this.state = {
            included: included,
            dataset: Object.assign({}, dataset),
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

    handleProjectedOnlyChange(value) {
        this.setState({
            dataset: Object.assign({}, this.state.dataset, {
                projectedOnly: value
            })
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

    handleLoadClick() {
        DialogUtil.showOpenFileDialog()
            .then((filePath) => {
                return FileUtil.readValuesFromFile(filePath);
            })
            .then((values) => {
                console.log('loaded stream', values.length);

                const { stream, transformation } = this.state;
                const newStream = stream.concat(values);
                console.log('new stream', newStream.length);

                return StreamUtil.transformStream(newStream, transformation)
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
        return StreamUtil.transformStream(this.state.stream, transformation)
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

    handleSaveClick() {
        const { dataset, included, stream, transformedStream, transformation } = this.state;

        let changes = {
            included: included,
            dataset: Object.assign({}, dataset, {
                transformationType: transformation.type,
                transformationValue: transformation.value
            }),
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

        const content = [];

        content.push(
            <DatasetInfo
                key='dataset-info'
                dataset={dataset}
                included={this.state.included}
                single={this.props.single}
                onIncludeChange={this.handleIncludeChange.bind(this)}
                onProjectedOnlyChange={this.handleProjectedOnlyChange.bind(this)}
                onDatasetChange={this.handleDatasetChange.bind(this)}
                onDeleteClick={this.handleDeleteClick.bind(this)}
                onCloseClick={this.handleCloseClick.bind(this)}
                onLoadClick={this.handleLoadClick.bind(this)}
                onSaveClick={this.handleSaveClick.bind(this)}/>
        );

        if (this.state.stream.length > 0) {
            content.push(
                <div
                    key='dataset-stream'
                    style={{paddingTop: '10px'}}>

                    <StreamEditor
                        dataset={dataset}
                        stream={this.state.stream}
                        transformedStream={this.state.transformedStream}
                        transformation={this.state.transformation}
                        selectedEntries={this.props.selectedEntries}
                        onTransformationChange={this.handleStreamTransformationChange.bind(this)}/>
                </div>
            );
        }

        return (
            <div>{ content }</div>
        );
    }
}

StreamDatasetDetail.propTypes = {
    /* dataset object */
    dataset: React.PropTypes.object.isRequired,
    included: React.PropTypes.bool.isRequired,
    /* array of stream values */
    stream: React.PropTypes.array.isRequired,
    /* array of transformed stream values */
    transformedStream: React.PropTypes.array.isRequired,
    /* indicator whether this project can have only 1 dataset */
    single: React.PropTypes.bool.isRequired,
    /* selected entries */
    selectedEntries: React.PropTypes.array.isRequired,
    /* callbacks */
    onSaveClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
    onEntrySelected: React.PropTypes.func.isRequired
};

module.exports = StreamDatasetDetail;
