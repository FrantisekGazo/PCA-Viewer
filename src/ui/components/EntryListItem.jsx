"use strict";

const React = require('react');


const EntryListItem = ({entry, onClick}) => {
    let i = 1;
    const valueCells = entry.value.map(v => (<td key={i++}>{v}</td>));
    return (
        <tr onClick={onClick}>
            <td key={0}>{entry.name}</td>
            { valueCells }
        </tr>
    )
};

EntryListItem.propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

module.exports = EntryListItem;
