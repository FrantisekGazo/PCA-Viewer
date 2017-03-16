"use strict";

const React = require('react');
const { TableRow, TableRowColumn } = require('material-ui/Table');


/**
 * Shows a dataset entry values.
 */
class EntryListItem extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.isEntrySelected !== nextProps.isEntrySelected
            || this.props.entry.name !== nextProps.entry.name
            || this.props.entry.value !== nextProps.entry.value;
    }

    handleClick() {
        this.props.onClick([this.props.entry.id]);
    }

    render() {
        const { entry, isEntrySelected } = this.props;

        let i = -1;
        const valueCells = entry.value.map(v => {
            i += 1;
            return (
                <TableRowColumn key={i}>{ v }</TableRowColumn>
            )
        });
        return (
            <TableRow
                style={{
                    color: (isEntrySelected ? '#ff0000' : '#000000') //TODO
                }}
                onTouchTap={this.handleClick.bind(this)}
                hoverable={true}>

                <TableRowColumn key={-1}>{ entry.name }</TableRowColumn>

                { valueCells }

            </TableRow>
        );
    }
}

EntryListItem.propTypes = {
    entry: React.PropTypes.object.isRequired,
    isEntrySelected: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
};

module.exports = EntryListItem;
