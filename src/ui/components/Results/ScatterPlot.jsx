"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");


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
    },
    // legend
    showlegend: true,
    legend: {
        orientation: "h"
    }
};

const opts = {
    displayModeBar: true
};

const ELEMENT_ID = 'scatter_plot';

const areDisjunct = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                return false;
            }
        }
    }
    return true;
};

const isSelected = (selectedIds, id) => selectedIds.indexOf(id) >= 0;


class ScatterPlot extends React.Component {

    constructor(props) {
        super(props);

        // do not notify about the same selection
        this.lastSelection = null;
    }

    handlePlotClick(event) {
        const points = event.points;

        if (points.length > 0) {
            console.log('selected:', event);
            const point = points[0];

            const d = this.props.data[point.curveNumber];
            const datasetId = d.id;
            const entryId = d.entryIds[point.pointNumber];

            if (this.lastSelection !== entryId) {
                this.lastSelection = entryId;
                this.props.onPlotClick(datasetId, entryId);
            }
        }
    }

    drawPlot() {
        // FIXME : looks like not all entries are shown on the scatter plot ?!
        const { data, usedColumns, selectedEntryIds, selectedColor } = this.props;

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
                        color: d.entryIds.map(id => isSelected(selectedEntryIds, id) ? selectedColor : d.color),
                        size: 8,
                        line: {
                            color: '#cccccc',
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
                        color: d.entryIds.map(id => isSelected(selectedEntryIds, id) ? selectedColor : d.color),
                        size: 8,
                        line: {
                            color: '#cccccc',
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
            ELEMENT_ID,
            plotData,
            layout,
            opts
        );
        // set click callback
        document.getElementById(ELEMENT_ID).on('plotly_click', this.handlePlotClick.bind(this));
    }

    componentDidMount() {
        this.drawPlot();
    }

    componentDidUpdate() {
        this.drawPlot();
    }

    didDataChange(nextProps) {
        return this.props.dataVersion !== nextProps.dataVersion
            || this.props.usedColumns !== nextProps.usedColumns;
    }

    didSelectionChange(nextProps) {
        return this.props.selectedEntryIds !== nextProps.selectedEntryIds;
    }

    redrawSelection(nextProps) {
        const plot = document.getElementById(ELEMENT_ID);
        const { data } = this.props;
        const { selectedColor } = nextProps;
        const newSelectedEntryIds = nextProps.selectedEntryIds;
        const oldSelectedEntryIds = this.props.selectedEntryIds;


        let d, update;
        for (let i = 0; i < data.length; i++) {
            d = data[i];

            if (areDisjunct(newSelectedEntryIds, d.entryIds) && areDisjunct(oldSelectedEntryIds, d.entryIds)) {
                continue;
            }

            update = {
                marker: {
                    color: d.entryIds.map(id => isSelected(newSelectedEntryIds, id) ? selectedColor : d.color),
                    size: 8,
                    line: {
                        color: '#cccccc',
                        width: 1
                    }
                }
            };

            Plotly.restyle(plot, update, i);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.didDataChange(nextProps)) {
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

ScatterPlot.propTypes = {
    // array of data objects
    data: React.PropTypes.array.isRequired,
    dataVersion: React.PropTypes.number.isRequired,
    // selection information
    selectedEntryIds: React.PropTypes.array.isRequired,
    selectedColor: React.PropTypes.string.isRequired,
    // array of column indexes
    usedColumns: React.PropTypes.array.isRequired,
    // click callback
    onPlotClick: React.PropTypes.func.isRequired,
};

module.exports = ScatterPlot;
