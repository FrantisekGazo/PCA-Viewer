"use strict";

const React = require('react');
const { TableRow, TableRowColumn } = require('material-ui/Table');
const TextField = require('material-ui/TextField').default;

const tableCell = (key, value) => {
    return (
        <TableRowColumn key={key}>
            <TextField id={`${key}`}
                       defaultValue={value}
                       onChange={(event, newValue) => {
                           console.error('TODO onChange(event, newValue)', event, newValue)
                       }}/>
        </TableRowColumn>
    );
};

const EntryListItem = ({entry, onClick, otherProps}) => {
    let i = 1;
    const valueCells = entry.value.map(v => tableCell(i++, v));
    return (
        <TableRow onTouchTap={onClick} hoverable={true}>
            { tableCell(0, entry.name) }
            { valueCells }
        </TableRow>
    )
};

EntryListItem.propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

module.exports = EntryListItem;
