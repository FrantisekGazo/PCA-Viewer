"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");


const ELEMENT_ID = "spectrumPlot";


/**
 * React component that shows a spectrum chart for dataset entries.
 */
class EntrySpectrumPlot extends React.Component {

    handlePlotClick(event) {
        const points = event.points;

        if (points && points.length > 0) {
            let entryIds = [];

            let point, entry;
            for (let i = 0; i < points.length; i++) {
                point = points[i];
                entry = this.props.entries[point.curveNumber];
                entryIds.push(entry.id);
            }

            this.props.onPlotClick(entryIds);
        }
    }

    drawPlot() {
        if (this.props.entries.length === 0) {
            return;
        }

        const { entries, selectedEntryIds, selectedColor, defaultColor } = this.props;

        let i = 0;
        const x = entries[0].value.map(v => i++);

        const data = entries.map(entry => {
            const isSelected = (selectedEntryIds.indexOf(entry.id) >= 0);
            return {
                name: entry.name,
                x: x,
                y: entry.value,
                mode: 'lines',
                opacity: isSelected ? .9 : .4,
                line: {
                    color: isSelected ? selectedColor : defaultColor,
                    width: isSelected ? 3 : 1
                }
            }
        });

        const layout = {
            title: 'Spectrum',
            hovermode: 'closest',
            // margin: 30,
            xaxis: {
                zeroline: true,
                gridcolor: "transparent",
                // title: "X axis label"
            },
            yaxis: {
                zeroline: true,
                // title: "Y axis label"
            }
        };

        const opts = {
            displayModeBar: true
        };

        Plotly.newPlot(
            ELEMENT_ID,
            data,
            layout,
            opts
        );
        // set click callback
        document.getElementById(ELEMENT_ID).on('plotly_click', this.handlePlotClick.bind(this));
    }

    redrawSelection(nextProps) {
        const { entries } = this.props; // entries are the same
        const { selectedEntryIds, selectedColor, defaultColor } = nextProps;
        const plot = document.getElementById(ELEMENT_ID);

        let entry, d;
        for (let i = 0; i < entries.length; i++) {
            entry = entries[i];
            const isSelected = (selectedEntryIds.indexOf(entry.id) >= 0);

            d = plot.data[i];
            d.opacity = isSelected ? .9 : .4;
            d.line = {
                color: isSelected ? selectedColor : defaultColor,
                width: isSelected ? 3 : 1
            };
        }

        Plotly.redraw(plot);
    }

    componentDidMount() {
        this.drawPlot();
    }

    componentDidUpdate() {
        this.drawPlot();
    }

    didValuesChange(nextProps) {
        const currentEntries = this.props.entries;
        const newEntries = nextProps.entries;

        if (currentEntries.length !== newEntries.length) {
            return true;
        }

        for (let i = 0; i < currentEntries.length; i++) {
            if (currentEntries[i] !== newEntries[i]) {
                return true;
            }
        }

        return false;
    }

    didSelectionChange(nextProps) {
        return this.props.defaultColor !== nextProps.defaultColor
            || this.props.selectedColor !== nextProps.selectedColor
            || this.props.selectedEntryIds !== nextProps.selectedEntryIds;
    }

    shouldComponentUpdate(nextProps, nextState) {
        const valuesChanged = this.didValuesChange(nextProps);

        if (valuesChanged) {
            return true;
        } else {
            if (this.didSelectionChange(nextProps)) {
                this.redrawSelection(nextProps);
            }
            return false;
        }
    }

    render() {
        return (
            <div id={ELEMENT_ID}></div>
        );
    }
}

EntrySpectrumPlot.propTypes = {
    // entries
    entries: React.PropTypes.array.isRequired,
    defaultColor: React.PropTypes.string.isRequired,
    // selection info
    selectedEntryIds: React.PropTypes.array.isRequired,
    selectedColor: React.PropTypes.string.isRequired,
    // click callback
    onPlotClick: React.PropTypes.func.isRequired,
};

module.exports = EntrySpectrumPlot;
