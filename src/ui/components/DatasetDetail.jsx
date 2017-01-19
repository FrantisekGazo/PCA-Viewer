"use strict";

const React = require('react');
const Avatar = require('material-ui/Avatar').default;
const { Card, CardActions, CardHeader, CardMedia, CardText } = require('material-ui/Card');
const FlatButton = require('material-ui/FlatButton').default;
const Divider = require('material-ui/Divider').default;
const TextField = require('material-ui/TextField').default;

const ColorPicker = require('../components/ColorPicker');
const EntryList = require('./EntryList.jsx');
const EntrySpectrumPlot = require('./EntrySpectrumPlot.jsx');

const DatasetDetail = ({dataset, datasetEntries, onSaveClick, onDeleteClick, onCloseClick, onLoadEntriesClick, onEntryClick}) => {
    let changes = {
        dataset: {},
        entries: {}
    };

    return (
        <Card id="dataset-detail">
            <CardActions>
                <ColorPicker
                    key={`editable-dataset-avatar-${dataset.id}`}
                    value={dataset.color}
                    letter={dataset.name.substr(0, 1)}
                    onChange={(newValue) => {
                        changes.dataset.color = newValue;
                    }}/>

                <TextField
                    key={`editable-dataset-name-${dataset.id}`}
                    floatingLabelText={"Name"}
                    defaultValue={dataset.name}
                    onChange={(event, newValue) => {
                        changes.dataset.name = newValue;
                    }}/>
            </CardActions>

            <CardText>
                <TextField
                    key={`editable-dataset-desc-${dataset.id}`}
                    floatingLabelText={"Description"}
                    multiLine={true}
                    underlineShow={true}
                    fullWidth={true}/>
            </CardText>

            <CardMedia>
                <EntrySpectrumPlot
                    title="Spectrum"
                    entries={datasetEntries}
                    onPlotClick={(p) => {
                        console.error('TODO PLOT CLICK:', p);
                    }}/>
            </CardMedia>

            <CardMedia>
                <EntryList
                    entries={datasetEntries}
                    onEntryClick={(entryId) => {
                        onEntryClick(dataset.id, entryId)
                    }}/>
            </CardMedia>

            <CardActions>
                <FlatButton
                    label="Load Entries"
                    onTouchTap={() => onLoadEntriesClick(dataset.id)}/>

                <FlatButton
                    label="Save"
                    onTouchTap={() => onSaveClick(dataset.id, changes)}/>

                <FlatButton
                    label="Close"
                    onTouchTap={() => onCloseClick(dataset.id)}/>

                <FlatButton
                    label="Delete"
                    onTouchTap={() => onDeleteClick(dataset.id)}/>
            </CardActions>
        </Card>
    );
};

DatasetDetail.propTypes = {
    dataset: React.PropTypes.object.isRequired,
    datasetEntries: React.PropTypes.array.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onCloseClick: React.PropTypes.func.isRequired,
    onLoadEntriesClick: React.PropTypes.func.isRequired,
    onEntryClick: React.PropTypes.func.isRequired
};

module.exports = DatasetDetail;
