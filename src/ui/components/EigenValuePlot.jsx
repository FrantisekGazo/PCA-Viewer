"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");


class EigenvaluePlot extends React.Component {

    drawPlot() {
        const elementId = "eigenvaluePlot";

        let i = 0;
        const x = this.props.values.map(v => i++);

        const data = [
            {
                name: 'Eigenvalues',
                x: x,
                y: this.props.values,
                type: 'bar'
            },
            {
                name: 'Cumulative Explained Variance',
                x: x,
                y: this.props.cumulativeVariance,
                yaxis: 'y2',
                type: 'line'
            }
        ];

        const layout = {
            title: '',
            hovermode: 'closest',
            yaxis: {
                zeroline: true,
                title: "Eigenvalue"
            },
            yaxis2: {
                zeroline: true,
                title: "Cumulative Explained Variance",
                overlaying: 'y',
                side: 'right'
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
        return this.props.values != nextProps.values;
    }

    render() {
        return (
            <div id="eigenvaluePlot"></div>
        );
    }
}

EigenvaluePlot.propTypes = {
    values: React.PropTypes.array.isRequired,
    cumulativeVariance: React.PropTypes.array.isRequired
};

module.exports = EigenvaluePlot;
