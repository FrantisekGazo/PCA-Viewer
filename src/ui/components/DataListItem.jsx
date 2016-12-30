"use strict";

const React = require('react');


const DataListItem = ({data, onClick}) => {
    return (
        <div onClick={onClick}>
            {data.name}
        </div>
    )
};

DataListItem.propTypes = {
    data: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

module.exports = DataListItem;
