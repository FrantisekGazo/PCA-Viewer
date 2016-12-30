"use strict";

const React = require('react');


const ProjectDatasetListItem = ({dataset, onClick}) => {
    return (
        <div onClick={onClick}>
            {dataset.name}
        </div>
    )
};

ProjectDatasetListItem.propTypes = {
    dataset: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

module.exports = ProjectDatasetListItem;
