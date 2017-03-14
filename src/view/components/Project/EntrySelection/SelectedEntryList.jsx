"use strict";

const React = require('react');
const { AutoSizer, List } = require('react-virtualized');
const SelectedEntry = require('./SelectedEntry');


/**
 * Shows list of selected entries.
 */
class SelectedEntryList extends React.Component {

    renderRow({ index, key, style }) {
        const { entries, deletable, onDeleteClick } = this.props;
        const entry = entries[index];
        return (
            <SelectedEntry
                key={`${entry.id}`}
                entry={entry}
                deletable={deletable}
                onDeleteClick={onDeleteClick}
                style={style}/>
        );
    }

    render() {
        const { entries } = this.props;

        return (
            <div style={{ flex: '1 1 auto' }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={500}
                            rowCount={entries.length}
                            rowHeight={70}
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
    /* true if this entry is deletable */
    deletable: React.PropTypes.bool.isRequired,
    /* callback */
    onDeleteClick: React.PropTypes.func.isRequired,
};

module.exports = SelectedEntryList;
