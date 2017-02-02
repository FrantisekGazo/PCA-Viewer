"use strict";

const React = require('react');
const { Card, CardActions, CardHeader, CardMedia } = require('material-ui/Card');

const EntryList = require('./EntryList.jsx');
const { EntrySpectrumPlot } = require('../Plot');


class DatasetEntries extends React.Component {

    render() {
        const {
            color,
            entries,
            onEntrySelected
        } = this.props;

        if (entries.length > 0) {
            return (
                <Card>
                    <CardHeader title='Entries:'/>

                    <CardMedia>
                        <EntrySpectrumPlot
                            defaultColor={color}
                            entries={entries}
                            onPlotClick={onEntrySelected}/>
                    </CardMedia>

                    <CardMedia>
                        <EntryList
                            entries={entries}
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
    color: React.PropTypes.string.isRequired,
    entries: React.PropTypes.array.isRequired,
    onEntryAdd: React.PropTypes.func.isRequired, // TODO : implement
    onEntryRemove: React.PropTypes.func.isRequired, // TODO : implement
    onEntrySelected: React.PropTypes.func.isRequired,
};

module.exports = DatasetEntries;
