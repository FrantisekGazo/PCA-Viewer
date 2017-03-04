"use strict";

const React = require('react');
const { ListItem } = require('material-ui/List');
const IconButton = require('material-ui/IconButton').default;
const IconDelete = require('material-ui/svg-icons/action/delete').default;


class SelectedEntry extends React.Component {

    render() {
        const { entry, deletable, onDeleteClick } = this.props;

        let desc = entry.value.join(', ');
        if (entry.streamIndex) {
            desc = `stream index: ${entry.streamIndex}, values: ` + desc;
        }

        const deleteIcon = <IconButton onTouchTap={() => onDeleteClick([entry.id])}><IconDelete color={'#ae0000'}/></IconButton>;

        return (
            <ListItem
                style={{ color: entry.color }}
                primaryText={entry.name}
                secondaryText={desc}
                rightIconButton={
                    deletable ? deleteIcon : null
                }/>
        );
    }

}

SelectedEntry.propTypes = {
    /* selected entry */
    entry: React.PropTypes.object.isRequired,
    /* true if this entry is deletable */
    deletable: React.PropTypes.bool.isRequired,
    /* callback */
    onDeleteClick: React.PropTypes.func.isRequired,
};

module.exports = SelectedEntry;
