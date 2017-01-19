"use strict";

const React = require('react');
const { TableRow, TableRowColumn } = require('material-ui/Table');
const TextField = require('material-ui/TextField').default;


const tableCell = (id, index, value, onChange, isNumber) => {
    return (
        <TableRowColumn key={index}>
            <TextField id={`${index}`}
                       defaultValue={value}
                       onChange={(event, newValue) => {
                           let val = newValue;
                           // add check for number and don't allow some text to be saved
                           if (isNumber && val !== null) {
                               val = parseFloat(val);
                               if (isNaN(val)) {
                                   val = null;
                               }
                           }
                           // if same as original value, clear it
                           if (newValue === value) {
                               val = null;
                           }
                           // send event
                           onChange(id, index, val);
                       }}/>
        </TableRowColumn>
    );
};

const EntryListItem = ({entry, onClick, onChange}) => {
    let i = 0;
    const valueCells = entry.value.map(v => tableCell(entry.id, i++, v, onChange, true));
    return (
        <TableRow
            onTouchTap={onClick}
            hoverable={true}>

            { tableCell(entry.id, -1, entry.name, onChange, false) }

            { valueCells }

        </TableRow>
    );
};

EntryListItem.propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
};

module.exports = EntryListItem;
