"use strict";

const React = require('react');

const EntryListItem = require('./EntryListItem.jsx');


const EntryList = ({entries, onEntryClick, onLoadEntriesClick}) => {
    const list = entries.map(entry => (<EntryListItem key={entry.id}
                                                      entry={entry}
                                                      onClick={() => onEntryClick(entry.id)}/>));

    return (
        <div>
            Entries:
            <ul>{list}</ul>
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
