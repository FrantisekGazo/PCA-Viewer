"use strict";

const React = require('react');
const { ListItem } = require('material-ui/List');
const IconButton = require('material-ui/IconButton').default;
const IconDelete = require('material-ui/svg-icons/action/delete').default;


/**
 * Show selected entry information.
 */
class SelectedEntry extends React.Component {

    render() {
        const { style, entry, deletable, onDeleteClick } = this.props;

        let desc = entry.value.join(', ');
        if (entry.streamIndex) {
            desc = `stream index: ${entry.streamIndex}, values: ` + desc;
        }

        const deleteIcon = <IconButton onTouchTap={() => onDeleteClick([entry.id])}><IconDelete color={'#ae0000'}/></IconButton>;

        return (
            <div
                style={style}>
                <ListItem
                    style={{ color: entry.color }}
                    primaryText={entry.name}
                    secondaryText={desc}
                    rightIconButton={
                        deletable ? deleteIcon : null
                    }/>
            </div>
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
