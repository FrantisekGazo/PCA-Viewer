"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");
const { hexToRgbString } = require('../../../util/ColorUtil');


const layout = {
    // title: 'Scatter Plot',
    hovermode: 'closest',
    height: 480,
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

        const { data, usedColumns } = this.props;

        const usedIndexX = usedColumns[0];
        const usedIndexY = usedColumns[1];
        const usedIndexZ = usedColumns[2];

        let plotData = [];

        if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ === undefined) {
            // show 2D plot
            plotData = data.map(d => {
                return {
                    name: d.name,
                    x: d.values.map(val => val[usedIndexX]),
                    y: d.values.map(val => val[usedIndexY]),
                    mode: 'markers',
                    type: 'scatter',
                    marker: {
                        symbol: 'circle',
                        color: hexToRgbString(d.color),
                        size: 8,
                        line: {
                            color: hexToRgbString('#cccccc'),
                            width: 1
                        }
                    }
                }
            });
        } else if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ !== undefined) {
            // show 3D plot
            plotData = data.map(d => {
                return {
                    name: d.name,
                    x: d.values.map(val => val[usedIndexX]),
                    y: d.values.map(val => val[usedIndexY]),
                    z: d.values.map(val => val[usedIndexZ]),
                    mode: 'markers',
                    type: 'scatter3d',
                    marker: {
                        symbol: 'circle',
                        color: hexToRgbString(d.color),
                        size: 8,
                        line: {
                            color: hexToRgbString('#cccccc'),
                            width: 1
                        }
                    }
                }
            });

            // Generating random data..
            //
            // let x = [], y = [], z = [];
            // for (let i = 0; i < 50; i++) {
            //     x.push(10 * Math.random() - 5);
            //     y.push(10 * Math.random() - 5);
            //     z.push(10 * Math.random() - 5);
            // }
            // // Plotting the mesh
            // plotData.push({
            //     opacity: 0.5,
            //     color: hexToRgbString('#8879ff'),
            //     type: 'mesh3d',
            //     x: x,
            //     y: y,
            //     z: z,
            //     alphahull: 0
            // });
        } else {
            // other number is not supported
            console.error('Only 2D and 3D plot is supported', usedColumns);
            return;
        }

        Plotly.newPlot(
            elementId,
            plotData,
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
        return this.props.data !== nextProps.data
            || this.props.usedColumns !== nextProps.usedColumns;
    }

    render() {
        return (
            <div id="scatterPlot"></div>
        );
    }
}

ScatterPlot.propTypes = {
    // array of data objects
    data: React.PropTypes.array.isRequired,
    // array of column indexes
    usedColumns: React.PropTypes.array.isRequired
};

module.exports = ScatterPlot;
