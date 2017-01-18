"use strict";

const React = require('react');
const Subheader = require('material-ui/Subheader').default;
const { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } = require('material-ui/Table');

const EntryListItem = require('./EntryListItem.jsx');
const { range } = require('../../util/util');


const EntryList = ({entries, onEntryClick}) => {
    let valueCount = 0;
    entries.map(entry => {
        if (entry.value.length > valueCount) {
            valueCount = entry.value.length;
        }
    });

    if (valueCount > 0) {
        const valueHeaderCells = range(0, valueCount).map(i => (<TableHeaderColumn key={i}>{i + 1}</TableHeaderColumn>));

        const itemRows = entries.map(entry => (<EntryListItem key={entry.id}
                                                              entry={entry}
                                                              onClick={() => onEntryClick(entry.id)}/>));
        return (
            <Table fixedHeader={true}
                   height={400}>
                <TableHeader adjustForCheckbox={false}
                             displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn key={0}>Entry Name</TableHeaderColumn>
                        { valueHeaderCells }
                    </TableRow>
                </TableHeader>
                <TableBody stripedRows={true}
                           displayRowCheckbox={false}>
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
};

module.exports = EntryList;
