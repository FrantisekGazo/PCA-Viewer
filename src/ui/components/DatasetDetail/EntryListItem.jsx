"use strict";

const React = require('react');
const { TableRow, TableRowColumn } = require('material-ui/Table');


class EntryListItem extends React.Component {

    shouldComponentUpdate(newProps, newState) {
        return this.props.entry.name !== newProps.entry.name
            || this.props.entry.value !== newProps.entry.value;
    }

    render() {
        const { entry, onClick } = this.props;

        let i = -1;
        const valueCells = entry.value.map(v => {
            i += 1;
            return (
                <TableRowColumn key={i}>{ v }</TableRowColumn>
            )
        });
        return (
            <TableRow
                onTouchTap={onClick}
                hoverable={true}>

                <TableRowColumn key={-1}>{ entry.name }</TableRowColumn>

                { valueCells }

            </TableRow>
        );
    }
}

EntryListItem.propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
};

module.exports = EntryListItem;
