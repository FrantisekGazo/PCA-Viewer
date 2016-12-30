"use strict";

const React = require('react');

const EntryList = require('./EntryList.jsx');

const DatasetDetail = ({dataset, datasetEntries, onDeleteClick, onCloseClick, onLoadEntriesClick, onEntryClick}) => {
    return (
        <div id="dataset-detail">
            Name: {dataset.name}
            <br/>
            ID: {dataset.id}
            <br/>
            <EntryList entries={datasetEntries}
                       onEntryClick={(entryId) => {
                           onEntryClick(dataset.id, entryId)
                       }}
                       onLoadEntriesClick={() => onLoadEntriesClick(dataset.id)}/>
            <br/>
            <button onClick={() => onDeleteClick(dataset.id)}>Delete</button>
            <button onClick={() => onCloseClick(dataset.id)}>Close</button>
        </div>
    );
};

DatasetDetail.propTypes = {
    dataset: React.PropTypes.object.isRequired,
    datasetEntries: React.PropTypes.array.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
    onLoadEntriesClick: React.PropTypes.func.isRequired,
    onEntryClick: React.PropTypes.func.isRequired
};

module.exports = DatasetDetail;
