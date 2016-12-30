"use strict";

const React = require('react');

const EntryList = require('./EntryList.jsx');

const DatasetDetail = ({dataset, onDeleteClicked, onCloseClicked, onAddEntriesClicked, onEntryClicked}) => {
    return (
        <div id="dataset-detail">
            Name: {dataset.name}
            <br/>
            ID: {dataset.id}
            <br/>
            <EntryList entries={[{id: 1, name: 'data 1'},{id: 2, name: 'data 2'},{id: 3, name: 'data 3'},{id: 4, name: 'data 4'},{id: 5, name: 'data 5'}]}
                       onEntryClick={(entryId) => {
                           onEntryClicked(dataset.id, entryId)
                       }}
                       onAddEntryClick={() => onAddEntriesClicked(dataset.id)}/>
            <br/>
            <button onClick={() => onDeleteClicked(dataset.id)}>Delete</button>
            <button onClick={() => onCloseClicked(dataset.id)}>Close</button>
        </div>
    );
};

DatasetDetail.propTypes = {
    dataset: React.PropTypes.object.isRequired,
    onDeleteClicked: React.PropTypes.func.isRequired,
    onCloseClicked: React.PropTypes.func.isRequired,
    onAddEntriesClicked: React.PropTypes.func.isRequired,
    onEntryClicked: React.PropTypes.func.isRequired
};

module.exports = DatasetDetail;
