"use strict";

const React = require('react');


const EntryListItem = ({entry, onClick}) => {
    return (
        <div onClick={onClick}>
            {entry.name}
            <br/>
            [ {entry.value.toString()} ]
        </div>
    )
};

EntryListItem.propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

module.exports = EntryListItem;
