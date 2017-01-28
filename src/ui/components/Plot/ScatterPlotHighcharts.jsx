"use strict";

const React = require('react');
const Highcharts = require('highcharts'); // this has to be here
const ReactHighcharts = require('react-highcharts');

const { hexToRgbString } = require('../../../util/ColorUtil');


class ScatterPlot extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.entries !== nextProps.entries
            || this.props.usedValues !== nextProps.usedValues;
    }

    render() {
        const { usedValues } = this.props;

        const usedIndexX = usedValues[0];
        const usedIndexY = usedValues[1];
        const usedIndexZ = usedValues[2];

        const config = {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
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
            exporting: {
                type: 'image/jpeg'
            }
        };

        if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ === undefined) {
            // show 2D plot
            config.plotOptions = {
                scatter: {
                    marker: {
                        radius: 5,
                            states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x}, {point.y}'
                    }
                }
            };

            config.series = [{
                name: 'All',
                // TODO : do not show all in 1 series
                data: this.props.entries.map(entry => [entry.value[usedIndexX], entry.value[usedIndexY]]),
                color: hexToRgbString('#ff0000'),
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
            }];
        } else if (usedIndexX !== undefined && usedIndexY !== undefined && usedIndexZ !== undefined) {
            // show 3D plot
            console.error('TODO 3D');
            return null;
        } else {
            // other number is not supported
            console.error('Only 2D and 3D plot is supported', usedValues);
            return null;
        }

        return (
            <ReactHighcharts config={config}/>
        );
    }
}

ScatterPlot.propTypes = {
    entries: React.PropTypes.array.isRequired,
    usedValues: React.PropTypes.array.isRequired
};

module.exports = ScatterPlot;
