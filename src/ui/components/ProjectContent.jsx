"use strict";

const React = require('react');

const EigenvaluePlot = require('../components/EigenvaluePlot.jsx');


const ProjectContent = ({pca}) => {
    return (
        <div id="content">
            <EigenvaluePlot values={pca.getEigenvalues()} explainedVariance={pca.getExplainedVariance()} />
            <br/>
            <strong>Eigenvectors:</strong> { JSON.stringify(pca.getEigenvectors()) }
        </div>
    );
};

ProjectContent.propTypes = {
    pca: React.PropTypes.object.isRequired
};

module.exports = ProjectContent;
