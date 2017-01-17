"use strict";

const React = require('react');
const { TableRow, TableRowColumn } = require('material-ui/Table');


const EntryListItem = ({entry, onClick}) => {
    let i = 1;
    const valueCells = entry.value.map(v => (<TableRowColumn key={i++}>{v}</TableRowColumn>));
    return (
        <TableRow onTouchTap={onClick} hoverable={true}>
            <TableRowColumn key={0}>{entry.name}</TableRowColumn>
            { valueCells }
        </TableRow>
    )
};

EntryListItem.propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

module.exports = EntryListItem;
