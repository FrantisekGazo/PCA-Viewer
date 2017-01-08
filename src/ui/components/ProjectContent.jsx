"use strict";

const React = require('react');

const EigenvaluePlot = require('../components/EigenvaluePlot.jsx');
const ScatterPlot = require('../components/ScatterPlot.jsx');


const ProjectContent = ({eigenvalues, cumulativeVariance, transformedEntries}) => {
    return (
        <div id="content">
            Results:
            <EigenvaluePlot values={eigenvalues} cumulativeVariance={cumulativeVariance} />
            <ScatterPlot entries={transformedEntries}/>
        </div>
    );
};

ProjectContent.propTypes = {
    eigenvalues: React.PropTypes.array.isRequired,
    cumulativeVariance: React.PropTypes.array.isRequired,
    transformedEntries: React.PropTypes.array.isRequired
};

module.exports = ProjectContent;
