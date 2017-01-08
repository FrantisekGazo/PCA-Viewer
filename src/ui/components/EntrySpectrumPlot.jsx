"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");
const { hexToRgbString } = require('../../service/ColorService');


class EntrySpectrumPlot extends React.Component {

    drawPlot() {
        const elementId = "spectrumPlot";

        const data = this.props.entries.map(entry => {
            let i = 0;
            const x = entry.value.map(v => i++);

            return {
                name: entry.name,
                x: x,
                y: entry.value,
                mode: 'lines',
                line: {
                    color: hexToRgbString(entry.color)
                }
            }
        });

        const layout = {
            title: this.props.title,
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
        return this.props.entries != nextProps.entries;
    }

    render() {
        return (
            <div id="spectrumPlot"></div>
        );
    }
}

EntrySpectrumPlot.propTypes = {
    title: React.PropTypes.string.isRequired,
    entries: React.PropTypes.array.isRequired,
    onPlotClick: React.PropTypes.func.isRequired,
};

module.exports = EntrySpectrumPlot;
