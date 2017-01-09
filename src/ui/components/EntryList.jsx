"use strict";

const React = require('react');

const EntryListItem = require('./EntryListItem.jsx');
const { range } = require('../../util/util');


const EntryList = ({entries, onEntryClick, onLoadEntriesClick}) => {
    let valueCount = 0;
    entries.map(entry => {
        if (entry.value.length > valueCount) {
            valueCount = entry.value.length;
        }
    });

    let entriesTable = null;
    if (valueCount > 0) {
        const valueHeaderCells = range(0, valueCount).map(i => (<th key={i}>{i + 1}</th>));

        const itemRows = entries.map(entry => (<EntryListItem key={entry.id}
                                                              entry={entry}
                                                              onClick={() => onEntryClick(entry.id)}/>));
        entriesTable = (
            <table>
                <thead>
                <tr>
                    <th key={0}>Name</th>
                    { valueHeaderCells }
                </tr>
                </thead>
                <tbody>
                { itemRows }
                </tbody>
            </table>
        );
    }

    return (
        <div>
            Entries:
            { entriesTable }
            <button onClick={onLoadEntriesClick}>Load Entries</button>
        </div>
    );
};

EntryList.propTypes = {
    entries: React.PropTypes.array.isRequired,
    onEntryClick: React.PropTypes.func.isRequired,
    onLoadEntriesClick: React.PropTypes.func.isRequired
};

module.exports = EntryList;
