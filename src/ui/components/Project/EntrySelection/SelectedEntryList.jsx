"use strict";

const React = require('react');
const { AutoSizer, List } = require('react-virtualized');

const SelectedEntry = require('./SelectedEntry.jsx');


const MAX_SHOWN_ITEMS = 5;
const SHOWN_ITEMS_HEIGHT = 70;

/**
 * React component that shows list of selected entries.
 */
class SelectedEntryList extends React.Component {

    renderRow({ index, key, style }) {
        const { entries, onDeselect } = this.props;
        const entry = entries[index];
        return (
            <SelectedEntry
                key={`${entry.id}`}
                entry={entry}
                onDeselect={onDeselect}
                style={style}/>
        );
    }

    render() {
        const { entries } = this.props;

        return (
            <div style={{ flex: '1 1 auto' }}>
                <AutoSizer disableHeight={true}>
                    {({ width }) => (
                        <List
                            height={Math.min(MAX_SHOWN_ITEMS, entries.length) * SHOWN_ITEMS_HEIGHT}
                            rowCount={entries.length}
                            rowHeight={SHOWN_ITEMS_HEIGHT}
                            rowRenderer={this.renderRow.bind(this)}
                            width={width}/>
                    )}
                </AutoSizer>
            </div>
        );
    }
}

SelectedEntryList.propTypes = {
    /* selected entry */
    entries: React.PropTypes.array.isRequired,
    /* callback */
    onDeselect: React.PropTypes.func.isRequired,
};

module.exports = SelectedEntryList;
