"use strict";

const React = require('react');

const EntryList = require('./EntryList.jsx');
const EntrySpectrumPlot = require('./EntrySpectrumPlot.jsx');

const DatasetDetail = ({dataset, datasetEntries, onDeleteClick, onCloseClick, onLoadEntriesClick, onEntryClick}) => {
    return (
        <div id="dataset-detail">
            Name: {dataset.name}
            [
            <button onClick={() => onDeleteClick(dataset.id)}>Delete</button>
            <button onClick={() => onCloseClick(dataset.id)}>Close</button>
            ]
            <br/>
            ID: {dataset.id}
            <br/>
            <EntrySpectrumPlot title="Spectrum"
                               entries={datasetEntries}
                               onPlotClick={(p) => {
                                   console.log('PLOT CLICK:', p);
                               }}/>
            <br/>
            <EntryList entries={datasetEntries}
                       onEntryClick={(entryId) => {
                           onEntryClick(dataset.id, entryId)
                       }}
                       onLoadEntriesClick={() => onLoadEntriesClick(dataset.id)}/>
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
