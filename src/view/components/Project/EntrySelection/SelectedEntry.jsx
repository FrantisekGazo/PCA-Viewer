"use strict";

const React = require('react');
const { ListItem } = require('material-ui/List');
const IconButton = require('material-ui/IconButton').default;
const IconDelete = require('material-ui/svg-icons/action/delete').default;
const IconClose = require('material-ui/svg-icons/navigation/close').default;


/**
 * Show selected entry information.
 */
class SelectedEntry extends React.Component {

    render() {
        const { style, entry, deletable, onDeselect } = this.props;

        let desc = entry.value.join(', ');
        if (entry.streamIndex) {
            desc = `stream index: ${entry.streamIndex}, values: ` + desc;
        }

        const rightIcon = (
            <IconButton
                tooltip='Close'
                onTouchTap={() => onDeselect(entry.id)}>
                <IconClose/>
            </IconButton>
        );

        return (
            <div
                style={style}>
                <ListItem
                    style={{ color: entry.color }}
                    primaryText={entry.name}
                    secondaryText={desc}
                    rightIconButton={
                        deletable ? rightIcon : null
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
    onDeselect: React.PropTypes.func.isRequired,
};

module.exports = SelectedEntry;
