"use strict";

const React = require('react');


const EntryListItem = ({entry, onClick}) => {
    return (
        <div onClick={onClick}>
            {entry.name}
        </div>
    )
};

EntryListItem.propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

module.exports = EntryListItem;
