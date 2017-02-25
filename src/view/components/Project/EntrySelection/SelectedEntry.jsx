"use strict";

const React = require('react');
const { ListItem } = require('material-ui/List');


class SelectedEntry extends React.Component {

    render() {
        const { entry } = this.props;

        return (
            <ListItem
                primaryText={entry.name}
                secondaryText={entry.value.join(', ')}/>
        );
    }

}

SelectedEntry.propTypes = {
    entry: React.PropTypes.object.isRequired,
};

module.exports = SelectedEntry;
