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
const SERIES_PER_DATASET = 2;


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

                // console.log('point', point);
                if (point.curveNumber % SERIES_PER_DATASET === 0) {
                    d = this.props.results.data[point.curveNumber / SERIES_PER_DATASET];
                    entryId = d.entryIds[point.pointNumber];

                    entryIds.push(entryId);
                }
            }

            if (!equalArrays(this.lastSelection, entryIds)) {
                this.lastSelection = entryIds;
                this.props.onPlotClick(entryIds);
            }
        }
    }

    is2D() {
        return this.props.results.data[0].values[0].length === 2;
    }

    drawPlot() {
        const { results, selectedEntryIds, selectedColor } = this.props;
        const { data } = results;

        let plotData = [];

        if (this.is2D()) { // show 2D plot
            this.size = SIZE_2D;
            this.lineWidth = this.size / 10;

            for (let i = 0; i < data.length; i++) {
                const { name, color, values, entryIds, area } = data[i];

                const selected = entryIds.map(id => isSelected(selectedEntryIds, id));
                const plotPoints = {
                    name: name,
                    x: values.map(val => val[0]),
                    y: values.map(val => val[1]),
                    mode: 'markers',
                    type: 'scatter',
                    marker: {
                        symbol: 'circle',
                        color: color,
                        opacity: OPACITY,
                        size: this.size,
                        line: {
                            color: selected.map(s => s ? selectedColor : '#cccccc'),
                            width: selected.map(s => s ? this.lineWidth * 2 : this.lineWidth)
                        }
                    },
                    legendgroup: `group-${i}`,
                };
                plotData.push(plotPoints);

                if (area) {
                    const plotMean = {
                        name: name + ' MEAN',
                        x: [area.mean[0]],
                        y: [area.mean[1]],
                        mode: 'markers',
                        type: 'scatter',
                        marker: {
                            symbol: 'circle',
                            color: color,
                            size: this.size
                        },
                        hoverinfo: 'none',
                        showlegend: false,
                        legendgroup: `group-${i}`,
                    };

                    const plotEllipse = {
                        name: name + ' AREA',
                        x: area.ellipse.map(v => v[0]),
                        y: area.ellipse.map(v => v[1]),
                        mode: 'lines',
                        type: 'line',
                        marker: {
                            color: color,
                        },
                        hoverinfo: 'none',
                        showlegend: false,
                        legendgroup: `group-${i}`,
                    };

                    // plotData.push(plotMean);
                    plotData.push(plotEllipse);
                }
            }
        } else { // show 3D plot
            this.size = SIZE_3D;
            this.lineWidth = this.size / 10;

            for (let i = 0; i < data.length; i++) {
                const { name, color, values, entryIds, area } = data[i];

                const selected = entryIds.map(id => isSelected(selectedEntryIds, id));
                const plotPoints = {
                    name: name,
                    x: values.map(val => val[0]),
                    y: values.map(val => val[1]),
                    z: values.map(val => val[2]),
                    mode: 'markers',
                    type: 'scatter3d',
                    marker: {
                        symbol: 'circle',
                        color: selected.map(s => s ? selectedColor : color),
                        opacity: OPACITY,
                        size: this.size
                    },
                    legendgroup: `group-${i}`,
                };
                plotData.push(plotPoints);

                if (area) {
                    const plotMean = {
                        name: name + ' MEAN',
                        x: [area.mean[0]],
                        y: [area.mean[1]],
                        z: [area.mean[2]],
                        mode: 'markers',
                        type: 'scatter3d',
                        marker: {
                            symbol: 'circle',
                            color: color,
                            size: this.size
                        },
                        hoverinfo: 'none',
                        showlegend: false,
                        legendgroup: `group-${i}`,
                    };

                    const plotEllipsoid = { // FIXME : make point non-selectable
                        name: name + ' AREA',
                        x: area.ellipse.map(v => v[0]),
                        y: area.ellipse.map(v => v[1]),
                        z: area.ellipse.map(v => v[2]),
                        mode: 'lines',
                        type: 'mesh3d',
                        opacity: 0.2,
                        alphahull: 0,
                        color: color,
                        hoverinfo: 'none',
                        showlegend: false,
                        legendgroup: `group-${i}`,
                    };

                    // plotData.push(plotMean);
                    plotData.push(plotEllipsoid);
                }
            }
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
        return this.props.results.version !== nextProps.results.version;
    }

    didSelectionChange(nextProps) {
        return this.props.selectedEntryIds !== nextProps.selectedEntryIds;
    }

    redrawSelection(nextProps) {
        const plot = document.getElementById(ELEMENT_ID);
        const data = this.props.results.data;
        const { selectedColor } = nextProps;
        const newSelectedEntryIds = nextProps.selectedEntryIds;
        const oldSelectedEntryIds = this.props.selectedEntryIds;

        for (let i = 0; i < data.length; i++) {
            let update;
            const { color, entryIds } = data[i];

            if (areDisjunct(newSelectedEntryIds, entryIds) && areDisjunct(oldSelectedEntryIds, entryIds)) {
                continue;
            }

            const selected = entryIds.map(id => isSelected(newSelectedEntryIds, id));
            if (this.is2D()) { //2D
                update = {
                    marker: {
                        color: color,
                        opacity: OPACITY,
                        size: this.size,
                        line: {
                            color: selected.map(s => s ? selectedColor : '#cccccc'),
                            width: selected.map(s => s ? this.lineWidth * 2 : this.lineWidth)
                        }
                    }
                };
            } else { //3D
                update = {
                    marker: {
                        color: selected.map(s => s ? selectedColor : color),
                        opacity: OPACITY,
                        size: this.size
                    }
                };
            }

            Plotly.restyle(plot, update, i * SERIES_PER_DATASET);
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
    // object containing calculated results
    results: React.PropTypes.object.isRequired,
    // selection information
    selectedEntryIds: React.PropTypes.array.isRequired,
    selectedColor: React.PropTypes.string.isRequired,
    // click callback
    onPlotClick: React.PropTypes.func.isRequired,
};

module.exports = ScatterPlot;
