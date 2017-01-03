"use strict";

const React = require('react');


const ProjectContent = ({pca}) => {
    return (
        <div id="content">
            Content
            <br/>
            PCA: { pca }
        </div>
    );
};

ProjectContent.propTypes = {
    pca: React.PropTypes.string.isRequired
};

module.exports = ProjectContent;
