"use strict";

const React = require('react');
const { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } = require('material-ui/Table');
const FlatButton = require('material-ui/FlatButton').default;

const EntryListItem = require('./EntryListItem.jsx');
const { range } = require('../../../../util');


const SHOW_COUNT = 10;

/**
 * React component that shows list of dataset entries.
 */
class EntryList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            shownCount: 0
        };
    }

    showMore() {
        const { entries } = this.props;
        const { shownCount } = this.state;

        if (shownCount < entries.length) {
            this.setState({
                shownCount: shownCount + SHOW_COUNT
            });
        }
    }

    shouldComponentUpdate(newProps, newState) {
        const currentEntries = this.props.entries;
        const newEntries = newProps.entries;

        if (this.props.selectedEntryIds.lenght !== newProps.selectedEntryIds.length) {
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
        const { shownCount } = this.state;
        console.log("rendered:", shownCount);

        if (shownCount === 0) {
            setTimeout(() => this.showMore(), 1000);
        }

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

            const itemRows = entries.slice(0, shownCount).map(entry => {
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
                <div>
                    <Table
                        fixedHeader={true}
                        height={'300px'}
                        headerStyle={tableStyle}
                        bodyStyle={tableStyle}>

                        <TableHeader
                            adjustForCheckbox={false}
                            displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn key={-1}>Name</TableHeaderColumn>
                                { valueHeaderCells }
                            </TableRow>
                        </TableHeader>

                        <TableBody
                            stripedRows={true}
                            displayRowCheckbox={false}>
                            { itemRows }
                        </TableBody>
                    </Table>

                    {
                        (shownCount < entries.length) ? (
                            <FlatButton
                                label='Load more'
                                onTouchTap={this.showMore.bind(this)}/>
                        ) : null
                    }
                </div>
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
