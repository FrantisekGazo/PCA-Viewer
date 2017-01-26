"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");
const { hexToRgbString } = require('../../util/ColorUtil');


const layout = {
    // title: 'Scatter Plot',
    hovermode: 'closest',
    margin: {
        l: 30,
        r: 30,
        b: 30,
        t: 30
    },
    xaxis: {
        zeroline: true,
        title: "X"
    },
    yaxis: {
        zeroline: true,
        title: "Y"
    },
    zaxis: {
        zeroline: true,
        title: "Z"
    }
};

const opts = {
    displayModeBar: true
};

class ScatterPlot extends React.Component {

    drawPlot() {
        const elementId = "scatterPlot";

        const { usedValues } = this.props;

        const usedIndexX = usedValues[0];
        const usedIndexY = usedValues[1];
        const usedIndexZ = usedValues[2];

        let data = [];

        if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ === undefined) {
            // show 2D plot
            data = this.props.entries.map(entry => {
                return {
                    name: entry.name,
                    x: [entry.value[usedIndexX]],
                    y: [entry.value[usedIndexY]],
                    mode: 'markers',
                    type: 'scatter',
                    marker: {
                        color: hexToRgbString(entry.color),
                        size: 8
                    }
                }
            });
        } else if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ !== undefined) {
            // show 3D plot
            data = this.props.entries.map(entry => {
                return {
                    name: entry.name,
                    x: [entry.value[usedIndexX]],
                    y: [entry.value[usedIndexY]],
                    z: [entry.value[usedIndexZ]],
                    mode: 'markers',
                    type: 'scatter3d',
                    marker: {
                        color: hexToRgbString(entry.color),
                        size: 6
                    }
                }
            });
        } else {
            // other number is not supported
            console.error('Only 2D and 3D plot is supported', usedValues);
            return;
        }

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
