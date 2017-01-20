"use strict";

const React = require('react');
const { Card, CardHeader, CardMedia, CardText } = require('material-ui/Card');
const LinearProgress = require('material-ui/LinearProgress').default;

const EigenvaluePlot = require('../components/EigenvaluePlot.jsx');
const ScatterPlot = require('../components/ScatterPlot.jsx');


const ProjectContent = ({pca}) => {
    let content = null;

    if (pca.loading) {
        content = (
            <LinearProgress mode="indeterminate"/>
        );
    } else if (pca.loaded) {
        content = (
            <CardMedia>
                <EigenvaluePlot values={pca.eigenvalues} cumulativeVariance={pca.cumulativeVariance}/>
                <ScatterPlot entries={pca.transformedEntries}/>
            </CardMedia>
        );
    } else {
        content = (
            <CardText>
                You must add a dataset with some entries if you want to see something :)
            </CardText>
        );
    }

    return (
        <Card id="content">
            <CardHeader title="Results"/>
            { content }
        </Card>
    );
};

ProjectContent.propTypes = {
    pca: React.PropTypes.object.isRequired
};

module.exports = ProjectContent;
