"use strict";

const React = require('react');
const { TableRow, TableRowColumn } = require('material-ui/Table');
const TextField = require('material-ui/TextField').default;


const TableCell = ({id, index, value, onChange, isNumber}) => {
    return (
        <TableRowColumn>
            <TextField
                id={`${index}`}
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

TableCell.propTypes = {
    id: React.PropTypes.number.isRequired,
    index: React.PropTypes.number.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func.isRequired,
    isNumber: React.PropTypes.bool.isRequired,
};

const EntryListItem = ({entry, onClick, onChange}) => {
    let i = -1;
    const valueCells = entry.value.map(v => {
        i += 1;
        return (
            <TableCell key={i}
                       id={entry.id}
                       index={i}
                       value={v}
                       onChange={onChange}
                       isNumber={true}/>
        )
    });
    return (
        <TableRow
            onTouchTap={onClick}
            hoverable={true}>

            <TableCell id={entry.id} index={-1} value={entry.name} onChange={onChange} isNumber={false}/>

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
