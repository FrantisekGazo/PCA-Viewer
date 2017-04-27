"use strict";

const React = require('react');
const { Card, CardActions, CardHeader, CardMedia } = require('material-ui/Card');
const FlatButton = require('material-ui/FlatButton').default;

const EntryList = require('./EntryList.jsx');
const EntrySpectrumPlot = require('./EntrySpectrumPlot.jsx');


/**
 * React component that shows dataset entries
 */
class DatasetEntries extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showChart: false
        };
    }

    showChartWithDelay(force = false) {
        const { entries } = this.props;
        const { showChart } = this.state;

        if (force) {
            this.setState({
                showChart: true
            });
        } else if (!showChart && entries.length < 40) {
            setTimeout(() => {
                this.setState({
                    showChart: true
                });
            }, 300);
        }
    }

    render() {
        const {
            color,
            entries,
            selectedEntryIds,
            onEntrySelected
        } = this.props;
        const { showChart } = this.state;

        this.showChartWithDelay();

        if (entries.length > 0) {
            return (
                <Card>
                    <CardHeader title={`Entries: (${entries.length})`}/>

                    {
                        showChart ? (
                            <CardMedia>
                                <EntrySpectrumPlot
                                    entries={entries}
                                    selectedEntryIds={selectedEntryIds}
                                    defaultColor={color}
                                    selectedColor={'#ff0000'}
                                    onPlotClick={onEntrySelected}/>
                            </CardMedia>
                        ) : (
                            <FlatButton
                                label='Show Spectrum Chart'
                                onTouchTap={() => this.showChartWithDelay(true)}/>
                        )
                    }

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
    onEntryAdd: React.PropTypes.func.isRequired,
    onEntrySelected: React.PropTypes.func.isRequired,
};

module.exports = DatasetEntries;
