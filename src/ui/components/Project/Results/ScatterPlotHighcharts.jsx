"use strict";

const React = require('react');
const Highcharts = require('highcharts'); // this has to be here
const ReactHighcharts = require('react-highcharts');
require('highcharts-3d')(ReactHighcharts.Highcharts);
require('highcharts-exporting')(ReactHighcharts.Highcharts);

const {hexToRgbString} = require('../../../../util/ColorUtil');


const createSerie = (data, values) => {
    return {
        name: data.name,
        data: values,
        color: hexToRgbString(data.color),
        mode: 'markers',
        type: 'scatter',
        marker: {
            symbol: 'circle',
            size: 8,
            line: {
                color: hexToRgbString('#cccccc'),
                width: 1
            }
        }
    };
};

class ScatterPlot extends React.Component {

    constructor(props) {
        super(props);

        this.moveStart = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data !== nextProps.data
            || this.props.usedColumns !== nextProps.usedColumns;
    }

    render() {
        const {data, usedColumns} = this.props;

        const usedIndexX = usedColumns[0];
        const usedIndexY = usedColumns[1];
        const usedIndexZ = usedColumns[2];

        let config = {
            chart: {
                // zoomType: 'xy',
                renderTo: 'container',
                margin: 100,
                type: 'scatter'
            },
            xAxis: {
                title: {
                    enabled: false,
                }
            },
            yAxis: {
                title: {
                    enabled: false,
                }
            },
            zAxis: {
                title: {
                    enabled: false,
                }
            },
            exporting: {
                type: 'image/jpeg'
            }
        };

        if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ === undefined) {
            // show 2D plot
            console.log('2D');

            config.series = data.map(d => {
                const values = [];
                for (let i = 0; i < d.values.length; i++) {
                    const v = d.values[i];
                    values.push([v[usedIndexX], v[usedIndexY]]);
                }

                return createSerie(d, values);
            });
        } else if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ !== undefined) {
            // show 3D plot
            console.log('3D');

            config.chart.options3d = {
                enabled: true,
                alpha: 10,
                beta: 30,
                depth: 250,
                viewDistance: 5,
                fitToPlot: false,
                frame: {
                    bottom: {size: 1, color: 'rgba(0,0,0,0.02)'},
                    back: {size: 1, color: 'rgba(0,0,0,0.04)'},
                    side: {size: 1, color: 'rgba(0,0,0,0.06)'}
                }
            };

            config.series = data.map(d => {
                const values = [];
                for (let i = 0; i < d.values.length; i++) {
                    const v = d.values[i];
                    values.push([v[usedIndexX], v[usedIndexY], v[usedIndexZ]]);
                }

                return createSerie(d, values);
            });
        } else {
            // other number is not supported
            console.error('Only 2D and 3D plot is supported', usedColumns);
            return null;
        }

        return (
            <ReactHighcharts config={config} domProps = {{id: 'scatter-chart'}} ref="chart" />
        );
    }

    componentDidUpdate() {
        this.chart = this.refs.chart.getChart();
    }

    componentDidMount() {
        this.chart = this.refs.chart.getChart();

        const rotate = this.handleRotation.bind(this);

        const el = document.getElementById('scatter-chart');
        el.addEventListener('mousedown', (eStart) => {
            eStart = this.chart.pointer.normalize(eStart);

            this.chart.tooltip.hide(true);
            this.moveStart = {
                posX: eStart.pageX,
                posY: eStart.pageY,
                alpha: this.chart.options.chart.options3d.alpha,
                beta: this.chart.options.chart.options3d.beta,
                sensitivity: 5 // lower is more sensitive
            };

            document.addEventListener('mousemove', rotate, false);
        }, false);

        document.addEventListener('mouseup', (e) => {
            this.moveStart = null;
            document.removeEventListener('mousemove', rotate, false);
        }, false);
    }

    handleRotation(event) {
        if (!this.moveStart) {
            return;
        }

        // Run beta
        this.chart.options.chart.options3d.beta = this.moveStart.beta + (this.moveStart.posX - event.pageX) / this.moveStart.sensitivity;

        // Run alpha
        this.chart.options.chart.options3d.alpha = this.moveStart.alpha + (event.pageY - this.moveStart.posY) / this.moveStart.sensitivity;

        this.chart.redraw(false);
    }
}

ScatterPlot.propTypes = {
    // array of data objects
    data: React.PropTypes.array.isRequired,
    // array of column indexes
    usedColumns: React.PropTypes.array.isRequired
};

module.exports = ScatterPlot;
