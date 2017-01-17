"use strict";

const React = require('react');
const { Card, CardHeader, CardMedia } = require('material-ui/Card');

const EigenvaluePlot = require('../components/EigenvaluePlot.jsx');
const ScatterPlot = require('../components/ScatterPlot.jsx');


const ProjectContent = ({eigenvalues, cumulativeVariance, transformedEntries}) => {
    return (
        <Card id="content">
            <CardHeader title="Results"/>
            <CardMedia>
                <EigenvaluePlot values={eigenvalues} cumulativeVariance={cumulativeVariance} />
                <ScatterPlot entries={transformedEntries}/>
            </CardMedia>
        </Card>
    );
};

ProjectContent.propTypes = {
    eigenvalues: React.PropTypes.array.isRequired,
    cumulativeVariance: React.PropTypes.array.isRequired,
    transformedEntries: React.PropTypes.array.isRequired
};

module.exports = ProjectContent;
