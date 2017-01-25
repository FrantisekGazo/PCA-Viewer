"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");
const { hexToRgbString } = require('../../util/ColorUtil');


class EntrySpectrumPlot extends React.Component {

    drawPlot() {
        if (this.props.entries.length === 0) {
            return;
        }

        const elementId = "spectrumPlot";

        let i = 0;
        const x = this.props.entries[0].value.map(v => i++);

        const data = this.props.entries.map(entry => {
            return {
                name: entry.name,
                x: x,
                y: entry.value,
                mode: 'lines',
                line: {
                    color: hexToRgbString(entry.color ? entry.color : this.props.defaultColor)
                }
            }
        });

        const layout = {
            title: 'Spectrum',
            hovermode: 'closest',
            margin: 30,
            xaxis: {
                zeroline: true,
                gridcolor: "transparent",
                title: "X axis label"
            },
            yaxis: {
                zeroline: true,
                title: "Y axis label"
            }
        };

        const opts = {
            displayModeBar: true
        };

        Plotly.newPlot(
            elementId,
            data,
            layout,
            opts
        );
        // set click callback
        document.getElementById(elementId).on('plotly_click', this.props.onPlotClick)
    }

    componentDidMount() {
        this.drawPlot();
    }

    componentDidUpdate() {
        this.drawPlot();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.defaultColor !== nextProps.defaultColor) {
            return true;
        }

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

    render() {
        return (
            <div id="spectrumPlot"></div>
        );
    }
}

EntrySpectrumPlot.propTypes = {
    entries: React.PropTypes.array.isRequired,
    defaultColor: React.PropTypes.string.isRequired,
    onPlotClick: React.PropTypes.func.isRequired,
};

module.exports = EntrySpectrumPlot;
