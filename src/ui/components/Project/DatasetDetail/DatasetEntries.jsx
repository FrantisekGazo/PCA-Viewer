"use strict";

const React = require('react');
const { Card, CardActions, CardHeader, CardMedia } = require('material-ui/Card');

const EntryList = require('./EntryList.jsx');
const EntrySpectrumPlot = require('./EntrySpectrumPlot.jsx');


class DatasetEntries extends React.Component {

    render() {
        const {
            color,
            entries,
            selectedEntryIds,
            onEntrySelected
        } = this.props;

        if (entries.length > 0) {
            return (
                <Card>
                    <CardHeader title='Entries:'/>

                    <CardMedia>
                        <EntrySpectrumPlot
                            entries={entries}
                            selectedEntryIds={selectedEntryIds}
                            defaultColor={color}
                            selectedColor={'#ff0000'}
                            onPlotClick={onEntrySelected}/>
                    </CardMedia>

                    <CardMedia>
                        <EntryList
                            entries={entries}
                            selectedEntryIds={selectedEntryIds}
                            onEntryClick={onEntrySelected}/>
                    </CardMedia>
                </Card>
            );
        } else {
            return null;
        }
    }
}

DatasetEntries.propTypes = {
    // dataset color
    color: React.PropTypes.string.isRequired,
    // entries
    entries: React.PropTypes.array.isRequired,
    selectedEntryIds: React.PropTypes.array.isRequired,
    // callbacks
    onEntryAdd: React.PropTypes.func.isRequired, // TODO : implement
    onEntrySelected: React.PropTypes.func.isRequired,
};

module.exports = DatasetEntries;
