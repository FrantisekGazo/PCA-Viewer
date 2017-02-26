"use strict";

const React = require('react');
const Highcharts = require('highcharts'); // this has to be here
const ReactHighstock = require('react-highcharts/ReactHighstock');


class StreamPlot extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.stream !== nextProps.stream
            || this.props.color !== nextProps.color;
    }

    render() {
        const { stream, color } = this.props;

        if (stream.length == 0) {
            return null;
        }

        const config = {
            // use point number instead of timestamp
            navigator: {
                xAxis: {
                    labels: {
                        formatter: function() {
                            return this.value;
                        }
                    }
                }
            },
            xAxis: {
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            // change tooltip
            tooltip: {
                formatter: function () {
                    return `<strong>Point:</strong> ${this.x}<br/><strong>Value:</strong> ${Math.round(this.y * 100) / 100}`;
                }
            },
            // hide zoom options
            rangeSelector: {
                enabled: false
            },
            // data
            series: [{
                name: 'Data stream',
                data: stream,
                color: color
            }]
        };

        return (
            <ReactHighstock config={config}/>
        );
    }
}

StreamPlot.propTypes = {
    /* array of values */
    stream: React.PropTypes.array.isRequired,
    /* plot color */
    color: React.PropTypes.string.isRequired,
};

module.exports = StreamPlot;
