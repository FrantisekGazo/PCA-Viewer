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
            onEntryClick,
            onPlotClick
        } = this.props;

        if (entries.length > 0) {
            return (
                <Card>
                    <CardHeader title='Entries:'/>

                    <CardMedia>
                        <EntrySpectrumPlot
                            defaultColor={color}
                            entries={entries}
                            onPlotClick={onPlotClick}/>
                    </CardMedia>

                    <CardMedia>
                        <EntryList
                            entries={entries}
                            onEntryClick={onEntryClick}/>
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
    onEntryClick: React.PropTypes.func.isRequired,
    onEntryAdd: React.PropTypes.func.isRequired, // TODO : implement
    onEntryRemove: React.PropTypes.func.isRequired, // TODO : implement
    onPlotClick: React.PropTypes.func.isRequired,
};

module.exports = DatasetEntries;
