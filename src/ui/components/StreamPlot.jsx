"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");
const { hexToRgbString } = require('../../util/ColorUtil');


class EntrySpectrumPlot extends React.Component {

    drawPlot() {
        const { stream } = this.props;
        if (stream.length === 0) {
            return;
        }

        const elementId = "stream-plot";

        let i = 0;
        const data = [{
            x: stream.map(v => i++),
            y: stream,
            mode: 'lines',
            line: {
                color: hexToRgbString('#037eff')
            }
        }];

        const layout = {
            title: 'Stream',
            hovermode: 'closest',
            margin: 30,
            xaxis: {
                zeroline: true,
                gridcolor: "transparent",
                title: "X axis label"
            },
            yaxis: {
                zeroline: true,
                title: "Y axis label"
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
    }

    componentDidMount() {
        this.drawPlot();
    }

    componentDidUpdate() {
        this.drawPlot();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.stream !== nextProps.stream;
    }

    render() {
        return (
            <div id="stream-plot"></div>
        );
    }
}

EntrySpectrumPlot.propTypes = {
    stream: React.PropTypes.array.isRequired
};

module.exports = EntrySpectrumPlot;
