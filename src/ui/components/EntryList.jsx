"use strict";

const React = require('react');
const Subheader = require('material-ui/Subheader').default;
const { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } = require('material-ui/Table');

const EntryListItem = require('./EntryListItem.jsx');
const { range } = require('../../util/util');


const EntryList = ({entries, onEntryClick, onChange}) => {
    let valueCount = 0;
    entries.map(entry => {
        if (entry.value.length > valueCount) {
            valueCount = entry.value.length;
        }
    });

    if (valueCount > 0) {
        const valueHeaderCells = range(0, valueCount).map(i => {
            return (
                <TableHeaderColumn key={i}>
                    {i + 1}
                </TableHeaderColumn>
            );
        });

        const itemRows = entries.map(entry => {
            return (
                <EntryListItem
                    key={entry.id}
                    entry={entry}
                    onClick={() => onEntryClick(entry.id)}
                    onChange={onChange}/>
            )
        });

        const entryDimension = entries[0].value.length;
        const tableStyle = {minWidth: `${entryDimension * 80}px`};

        return (
            <Table fixedHeader={true} height={'300px'} headerStyle={tableStyle} bodyStyle={tableStyle}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn key={-1}>Name</TableHeaderColumn>
                        { valueHeaderCells }
                    </TableRow>
                </TableHeader>
                <TableBody stripedRows={true} displayRowCheckbox={false}>
                    { itemRows }
                </TableBody>
            </Table>
        );
    } else {
        return null;
    }
};

EntryList.propTypes = {
    entries: React.PropTypes.array.isRequired,
    onEntryClick: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
};

module.exports = EntryList;
