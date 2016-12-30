"use strict";

const React = require('react');


const DatasetListItem = ({dataset, onClick}) => {
    return (
        <div onClick={onClick}>
            {dataset.name}
        </div>
    )
};

DatasetListItem.propTypes = {
    dataset: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

module.exports = DatasetListItem;
