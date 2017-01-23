"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");
const { hexToRgbString } = require('../../util/ColorUtil');


class ScatterPlot extends React.Component {

    drawPlot() {
        const elementId = "scatterPlot";

        const data = this.props.entries.map(entry => {
            return {
                name: entry.name,
                x: [entry.value[0]],
                y: [entry.value[1]],
                mode: 'markers',
                type: 'scatter',
                marker: {
                    color: hexToRgbString(entry.color),
                    size: 12
                }
            }
        });

        const layout = {
            title: 'Scatter Plot',
            hovermode: 'closest',
            margin: 30,
            xaxis: {
                zeroline: true,
                title: "X axis"
            },
            yaxis: {
                zeroline: true,
                title: "Y axis"
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
            <div id="scatterPlot"></div>
        );
    }
}

ScatterPlot.propTypes = {
    entries: React.PropTypes.array.isRequired,
};

module.exports = ScatterPlot;
