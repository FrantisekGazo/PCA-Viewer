"use strict";

const React = require('react');
const { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } = require('material-ui/Table');

const EntryListItem = require('./EntryListItem.jsx');
const { range } = require('../../../../util/util');


class EntryList extends React.Component {

    shouldComponentUpdate(newProps, newState) {
        const currentEntries = this.props.entries;
        const newEntries = newProps.entries;

        if (this.props.selectedEntryIds !== newProps.selectedEntryIds) {
            return true;
        }

        if (currentEntries.length !== newEntries.length) {
            return true;
        }

        for (let i = 0; i < currentEntries.length; i++) {
            if (currentEntries[i] !== newEntries[i]) {
                return true;
            }
        }

        return false;
    }

    isEntrySelected(entryId) {
        return this.props.selectedEntryIds.indexOf(entryId) >= 0;
    }

    render() {
        const { entries, onEntryClick } = this.props;

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
                        isEntrySelected={this.isEntrySelected(entry.id)}
                        onClick={onEntryClick}/>
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
    }
}

EntryList.propTypes = {
    // entries
    entries: React.PropTypes.array.isRequired,
    selectedEntryIds: React.PropTypes.array.isRequired,
    // callback
    onEntryClick: React.PropTypes.func.isRequired,
};

module.exports = EntryList;
