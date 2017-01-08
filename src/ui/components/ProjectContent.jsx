"use strict";

const React = require('react');

const EigenvaluePlot = require('../components/EigenvaluePlot.jsx');
const ScatterPlot = require('../components/ScatterPlot.jsx');


const ProjectContent = ({pca, projectionMatrix, transformedMatrix, transformedEntries}) => {
    return (
        <div id="content">
            <EigenvaluePlot values={pca.getEigenvalues()} cumulativeVariance={pca.getCumulativeVariance()} />
            <br/>
            <strong>Eigenvalues:</strong> { JSON.stringify(pca.getEigenvalues()) }
            <br/>
            <strong>Eigenvectors:</strong> { JSON.stringify(pca.getEigenvectors()) }
            <ScatterPlot entries={transformedEntries}/>
            <br/>
            <strong>projectionMatrix:</strong> { JSON.stringify(projectionMatrix) }
            <br/>
            <strong>transformedMatrix:</strong> { JSON.stringify(transformedMatrix) }
            <br/>
            <strong>transformedEntries:</strong> { JSON.stringify(transformedEntries) }
            <br/>
            <strong>loadings:</strong> { JSON.stringify(pca.getLoadings()) }
        </div>
    );
};

ProjectContent.propTypes = {
    pca: React.PropTypes.object.isRequired,
    projectionMatrix: React.PropTypes.array.isRequired,
    transformedMatrix: React.PropTypes.array.isRequired,
    transformedEntries: React.PropTypes.array.isRequired
};

module.exports = ProjectContent;
