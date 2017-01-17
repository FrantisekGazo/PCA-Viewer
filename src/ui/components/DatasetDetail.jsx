"use strict";

const React = require('react');
const Avatar = require('material-ui/Avatar').default;
const { Card, CardActions, CardHeader, CardMedia } = require('material-ui/Card');
const FlatButton = require('material-ui/FlatButton').default;
const Divider = require('material-ui/Divider').default;

const EntryList = require('./EntryList.jsx');
const EntrySpectrumPlot = require('./EntrySpectrumPlot.jsx');

const DatasetDetail = ({dataset, datasetEntries, onDeleteClick, onCloseClick, onLoadEntriesClick, onEntryClick}) => {
    return (
        <Card id="dataset-detail">
            <CardHeader
                avatar={
                    <Avatar
                        color="#fff"
                        backgroundColor={dataset.color}
                        size={40}
                        style={{margin: 5}}>
                        {dataset.name.substr(0, 1)}
                    </Avatar>
                }
                title={dataset.name}
                subtitle={dataset.id}/>

            <CardActions>
                <FlatButton label="Load Entries" onTouchTap={() => onLoadEntriesClick(dataset.id)} />
                <FlatButton label="Close" onTouchTap={() => onCloseClick(dataset.id)} />
                <FlatButton label="Delete" onTouchTap={() => onDeleteClick(dataset.id)} />
            </CardActions>

            <Divider/>

            <CardMedia>
                <EntrySpectrumPlot title="Spectrum"
                                   entries={datasetEntries}
                                   onPlotClick={(p) => {
                                       console.log('PLOT CLICK:', p);
                                   }}/>
            </CardMedia>

            <CardMedia>
                <EntryList entries={datasetEntries}
                           onEntryClick={(entryId) => {
                               onEntryClick(dataset.id, entryId)
                           }}/>
            </CardMedia>
        </Card>
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
