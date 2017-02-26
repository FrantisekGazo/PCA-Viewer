"use strict";

const React = require('react');
const { ListItem } = require('material-ui/List');
const IconButton = require('material-ui/IconButton').default;
const IconDelete = require('material-ui/svg-icons/action/delete').default;


class SelectedEntry extends React.Component {

    render() {
        const { entry, onDeleteClick } = this.props;

        return (
            <ListItem
                primaryText={entry.name}
                secondaryText={entry.value.join(', ')}
                rightIconButton={
                    <IconButton onTouchTap={() => onDeleteClick([entry.id])}><IconDelete color={'#ae0000'}/></IconButton>
                }/>
        );
    }

}

SelectedEntry.propTypes = {
    /* selected entry */
    entry: React.PropTypes.object.isRequired,
    /* callback */
    onDeleteClick: React.PropTypes.func.isRequired,
};

module.exports = SelectedEntry;
