"use strict";

const React = require('react');

const DatasetInfo = require('./DatasetInfo.jsx');
const DatasetEntries = require('./DatasetEntries.jsx');

const DatasetUtil = require('../../../../util/DatasetUtil');
const DialogUtil = require('../../../../util/DialogUtil');
const FileUtil = require('../../../../util/FileUtil');


/**
 * React component that shows dataset detail of a dataset with constant sampling.
 */
class EntryDatasetDetail extends React.Component {

    constructor(props) {
        super(props);

        const { dataset, included, entries } = props;

        this.state = {
            included: included,
            dataset: Object.assign({}, dataset),
            entries: entries.slice(),
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

    handleEntryAdd(entry) {
        this.state.entries.push(entry);
        this.setState({
            update: this.state.update + 1
        });
    }

    handleAddEntryClick(entryValue) {
        const addedEntryIds = this.state.entries.map(entry => entry.id);
        addedEntryIds.push(this.props.lastEntryId);

        DatasetUtil.valuesToEntries(this.state.dataset.id, addedEntryIds, [entryValue])
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

    handleLoadClick() {
        DialogUtil.showOpenFileDialog()
            .then((filePath) => {
                return FileUtil.readValuesFromFile(filePath, this.props.sampling);
            })
            .then((values) => {
                const addedEntryIds = this.state.entries.map(entry => entry.id);
                addedEntryIds.push(this.props.lastEntryId);
                return DatasetUtil.valuesToEntries(this.state.dataset.id, addedEntryIds, values);
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

    handleClearClick() {
        this.setState({
            entries: [],
            update: this.state.update + 1
        });
    }

    handleSaveClick() {
        const { dataset, included, entries } = this.state;

        let changes = {
            included: included,
            dataset: dataset,
            entries: entries,
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
                single={false}
                sampling={this.props.sampling}
                onIncludeChange={this.handleIncludeChange.bind(this)}
                onProjectedOnlyChange={this.handleProjectedOnlyChange.bind(this)}
                onDatasetChange={this.handleDatasetChange.bind(this)}
                onDeleteClick={this.handleDeleteClick.bind(this)}
                onCloseClick={this.handleCloseClick.bind(this)}
                onAddEntry={this.handleAddEntryClick.bind(this)}
                onLoadClick={this.handleLoadClick.bind(this)}
                onClearClick={this.handleClearClick.bind(this)}
                onSaveClick={this.handleSaveClick.bind(this)}/>
        );

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

EntryDatasetDetail.propTypes = {
    /* dataset object */
    dataset: React.PropTypes.object.isRequired,
    included: React.PropTypes.bool.isRequired,
    /* sampling value */
    sampling: React.PropTypes.number.isRequired,
    /* array of dataset entries */
    entries: React.PropTypes.array.isRequired,
    selectedEntryIds: React.PropTypes.array.isRequired,
    /* last used entry ID */
    lastEntryId: React.PropTypes.number.isRequired,
    /* callbacks */
    onSaveClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
    onEntrySelected: React.PropTypes.func.isRequired
};

module.exports = EntryDatasetDetail;
