"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");
const { hexToRgbString } = require('../../util/ColorUtil');


class ScatterPlot extends React.Component {

    drawPlot() {
        const elementId = "scatterPlot";

        const { usedValues } = this.props;

        const usedIndexX = usedValues[0];
        const usedIndexY = usedValues[1];
        const usedIndexZ = usedValues[2];

        if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ === undefined) {
            // show 2D plot
            const data = this.props.entries.map(entry => {
                return {
                    name: entry.name,
                    x: [entry.value[usedIndexX]],
                    y: [entry.value[usedIndexY]],
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
        } else if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ !== undefined) {
            // show 3D plot
            console.error('TODO - implement 3D plot support');
        } else {
            // other number is not supported
            console.error('Only 2D and 3D plot is supported', usedValues);
        }
    }

    componentDidMount() {
        this.drawPlot();
    }

    componentDidUpdate() {
        this.drawPlot();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.entries !== nextProps.entries
            || this.props.usedValues !== nextProps.usedValues;
    }

    render() {
        return (
            <div id="scatterPlot"></div>
        );
    }
}

ScatterPlot.propTypes = {
    entries: React.PropTypes.array.isRequired,
    usedValues: React.PropTypes.array.isRequired
};

module.exports = ScatterPlot;
