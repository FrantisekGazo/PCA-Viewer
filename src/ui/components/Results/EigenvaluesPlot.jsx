"use strict";

const React = require('react');
const Plotly = require("plotly.js/dist/plotly.js");


class EigenvaluePlot extends React.Component {

    drawPlot() {
        const elementId = "eigenvaluePlot";

        let i = 0;
        const x = this.props.eigenvalues.map(v => i++);

        const data = [
            {
                name: 'E',
                x: x,
                y: this.props.eigenvalues,
                type: 'bar'
            },
            {
                name: 'CEV',
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
        setTimeout(() => {
            this.drawPlot();
        }, 300);
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.drawPlot();
        }, 300);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.eigenvalues !== nextProps.eigenvalues
            || this.props.cumulativeVariance !== nextProps.cumulativeVariance;
    }

    render() {
        return (
            <div id="eigenvaluePlot"></div>
        );
    }
}

EigenvaluePlot.propTypes = {
    eigenvalues: React.PropTypes.array.isRequired,
    cumulativeVariance: React.PropTypes.array.isRequired
};

module.exports = EigenvaluePlot;
