"use strict";

const React = require('react');
const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

const { hexToRgbString } = require('../../util/ColorUtil');


class StreamPlotH extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.stream !== nextProps.stream;
    }

    render() {
        const { stream } = this.props;

        if (stream.length == 0) {
            return null;
        }

        let i = 0;
        const config = {
            series: [{
                data: stream.slice(0, 100000)
            }]
        };

        return (
            <div>
                Shows only the first 100 000 values
                <ReactHighcharts config={config}/>
            </div>
        );
    }
}

StreamPlotH.propTypes = {
    stream: React.PropTypes.array.isRequired
};

module.exports = StreamPlotH;
