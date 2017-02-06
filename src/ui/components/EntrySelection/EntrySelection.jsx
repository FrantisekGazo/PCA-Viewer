"use strict";

const React = require('react');
const { Card, CardHeader, CardActions, CardMedia } = require('material-ui/Card');
const FlatButton = require('material-ui/FlatButton').default;

const SelectedEntry = require('./SelectedEntry.jsx');


class EntrySelection extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { selectedEntryIds, onClearClicked } = this.props;

        const selectedEntries = selectedEntryIds.map(id => {
            return (<SelectedEntry key={`${id}`} entry={id}/>);
        });

        return (
            <Card>
                <CardHeader
                    title={`${selectedEntryIds.length} Selected:`}/>

                <CardMedia>
                    { selectedEntries }
                </CardMedia>

                <CardActions>
                    <FlatButton
                        label='CLear'
                        onTouchTap={onClearClicked}/>
                </CardActions>
            </Card>
        );
    }
}

EntrySelection.propTypes = {
    selectedEntryIds: React.PropTypes.array.isRequired,
    onClearClicked: React.PropTypes.func.isRequired,
};

module.exports = EntrySelection;
