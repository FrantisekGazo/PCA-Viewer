"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");

const { equalArrays } = require('../../../../util');


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

const SIZE_2D = 10;
const SIZE_3D = 5;
const OPACITY = .5;


class ScatterPlot extends React.Component {

    constructor(props) {
        super(props);

        // do not notify about the same selection
        this.lastSelection = null;

        this.size = 0;
        this.lineWidth = 0;
    }

    handlePlotClick(event) {
        if (event === undefined) {
            return; // this happens when user uses BOX SELECTION and then clicks outside
        }

        const points = event.points;

        if (points) {
            let entryIds = [];

            let point, d, entryId;
            for (let i = 0; i < points.length; i++) {
                point = points[i];

                d = this.props.data[point.curveNumber];
                entryId = d.entryIds[point.pointNumber];

                entryIds.push(entryId);
            }

            if (!equalArrays(this.lastSelection, entryIds)) {
                this.lastSelection = entryIds;
                this.props.onPlotClick(entryIds);
            }
        }
    }

    drawPlot() {
        const { data, usedColumns, selectedEntryIds, selectedColor } = this.props;

        const usedIndexX = usedColumns[0];
        const usedIndexY = usedColumns[1];
        const usedIndexZ = usedColumns[2];

        let plotData = [];

        if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ === undefined) {
            this.size = SIZE_2D;
            this.lineWidth = this.size / 10;
            // show 2D plot
            plotData = data.map(d => {
                const selected = d.entryIds.map(id => isSelected(selectedEntryIds, id));
                return {
                    name: d.name,
                    x: d.values.map(val => val[usedIndexX]),
                    y: d.values.map(val => val[usedIndexY]),
                    mode: 'markers',
                    type: 'scatter',
                    marker: {
                        symbol: 'circle',
                        color: d.color,
                        opacity: OPACITY,
                        size: this.size,
                        line: {
                            color: selected.map(s => s ? selectedColor : '#cccccc'),
                            width: selected.map(s => s ? this.lineWidth * 2 : this.lineWidth)
                        }
                    }
                }
            });
            plotData = plotData.concat(data.map(d => {
                const area = d.area;
                const a = {
                    name: d.name + ' MEAN',
                    x: [area.mean[usedIndexX]],
                    y: [area.mean[usedIndexY]],
                    mode: 'markers',
                    type: 'scatter',
                    marker: {
                        symbol: 'circle',
                        color: d.color,
                        size: this.size
                    }
                };
                console.log('data area', a);
                return a;
            }));
            plotData = plotData.concat(data.map(d => {
                const area = d.area;
                const a = {
                    name: d.name + ' V 0',
                    x: [area.mean[usedIndexX], area.eigenvectors[0][usedIndexX] * area.eigenvalues[0]],
                    y: [area.mean[usedIndexY], area.eigenvectors[0][usedIndexY] * area.eigenvalues[0]],
                    mode: 'lines',
                    type: 'scatter',
                    marker: {
                        color: d.color,
                        size: this.size
                    }
                };
                console.log('data area', a);
                return a;
            }));
            plotData = plotData.concat(data.map(d => {
                const area = d.area;
                const a = {
                    name: d.name + ' V 2',
                    x: [area.mean[usedIndexX], area.eigenvectors[1][usedIndexX] * area.eigenvalues[1]],
                    y: [area.mean[usedIndexY], area.eigenvectors[1][usedIndexY] * area.eigenvalues[1]],
                    mode: 'lines',
                    type: 'scatter',
                    marker: {
                        color: d.color,
                        size: this.size
                    }
                };
                console.log('data area', a);
                return a;
            }));
        } else if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ !== undefined) {
            this.size = SIZE_3D;
            this.lineWidth = this.size / 10;
            // show 3D plot
            plotData = data.map(d => {
                const selected = d.entryIds.map(id => isSelected(selectedEntryIds, id));
                return {
                    name: d.name,
                    x: d.values.map(val => val[usedIndexX]),
                    y: d.values.map(val => val[usedIndexY]),
                    z: d.values.map(val => val[usedIndexZ]),
                    mode: 'markers',
                    type: 'scatter3d',
                    marker: {
                        symbol: 'circle',
                        color: selected.map(s => s ? selectedColor : d.color),
                        opacity: OPACITY,
                        size: this.size
                    }
                }
            });
            plotData = plotData.concat(data.map(d => {
                const area = d.area;
                const a = {
                    name: d.name + ' MEAN',
                    x: [area.mean[usedIndexX]],
                    y: [area.mean[usedIndexY]],
                    mode: 'markers',
                    type: 'scatter3d',
                    marker: {
                        symbol: 'circle',
                        color: d.color,
                        size: this.size
                    }
                };
                console.log('data area', a);
                return a;
            }));
            plotData = plotData.concat(data.map(d => {
                const area = d.area;
                const a = {
                    name: d.name + ' V 0',
                    x: [area.mean[usedIndexX], area.eigenvectors[0][usedIndexX] * area.eigenvalues[0]],
                    y: [area.mean[usedIndexY], area.eigenvectors[0][usedIndexY] * area.eigenvalues[0]],
                    z: [area.mean[usedIndexZ], area.eigenvectors[0][usedIndexZ] * area.eigenvalues[0]],
                    mode: 'lines',
                    type: 'scatter3d',
                    marker: {
                        color: d.color,
                        size: this.size
                    }
                };
                console.log('data area', a);
                return a;
            }));
            plotData = plotData.concat(data.map(d => {
                const area = d.area;
                const a = {
                    name: d.name + ' V 1',
                    x: [area.mean[usedIndexX], area.eigenvectors[1][usedIndexX] * area.eigenvalues[1]],
                    y: [area.mean[usedIndexY], area.eigenvectors[1][usedIndexY] * area.eigenvalues[1]],
                    z: [area.mean[usedIndexZ], area.eigenvectors[1][usedIndexZ] * area.eigenvalues[1]],
                    mode: 'lines',
                    type: 'scatter3d',
                    marker: {
                        color: d.color,
                        size: this.size
                    }
                };
                console.log('data area', a);
                return a;
            }));
            plotData = plotData.concat(data.map(d => {
                const area = d.area;
                const a = {
                    name: d.name + ' V 2',
                    x: [area.mean[usedIndexX], area.eigenvectors[2][usedIndexX] * area.eigenvalues[2]],
                    y: [area.mean[usedIndexY], area.eigenvectors[2][usedIndexY] * area.eigenvalues[2]],
                    z: [area.mean[usedIndexZ], area.eigenvectors[2][usedIndexZ] * area.eigenvalues[2]],
                    mode: 'lines',
                    type: 'scatter3d',
                    marker: {
                        color: d.color,
                        size: this.size
                    }
                };
                console.log('data area', a);
                return a;
            }));

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
            //     color: '#8879ff',
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

        // set click/selection callback
        const callback = this.handlePlotClick.bind(this);
        document.getElementById(ELEMENT_ID).on('plotly_selected', callback);
        document.getElementById(ELEMENT_ID).on('plotly_click', callback);
    }

    componentDidMount() {
        setTimeout(() => {
            this.drawPlot();
        }, 1000);
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.drawPlot();
        }, 300);
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
        const { data, usedColumns } = this.props;
        const { selectedColor } = nextProps;
        const newSelectedEntryIds = nextProps.selectedEntryIds;
        const oldSelectedEntryIds = this.props.selectedEntryIds;


        let d, update;
        for (let i = 0; i < data.length; i++) {
            d = data[i];

            if (areDisjunct(newSelectedEntryIds, d.entryIds) && areDisjunct(oldSelectedEntryIds, d.entryIds)) {
                continue;
            }

            const selected = d.entryIds.map(id => isSelected(newSelectedEntryIds, id));
            if (usedColumns[2]) { //3D
                update = {
                    marker: {
                        color: selected.map(s => s ? selectedColor : d.color),
                        opacity: OPACITY,
                        size: this.size
                    }
                };
            } else { //2D
                update = {
                    marker: {
                        color: d.color,
                        opacity: OPACITY,
                        size: this.size,
                        line: {
                            color: selected.map(s => s ? selectedColor : '#cccccc'),
                            width: selected.map(s => s ? this.lineWidth * 2 : this.lineWidth)
                        }
                    }
                };
            }

            Plotly.restyle(plot, update, i);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.didDataChange(nextProps)) {
            return true;
        } else {
            if (this.didSelectionChange(nextProps)) {
                this.redrawSelection(nextProps);
                this.lastSelection = null;
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
