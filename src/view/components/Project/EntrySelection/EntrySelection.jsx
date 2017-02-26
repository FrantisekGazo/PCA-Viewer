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
        const { selectedEntries, onClearClick, onDeleteClick } = this.props;

        const list = selectedEntries.map(entry => {
            return (
                <SelectedEntry
                    key={`${entry.id}`}
                    entry={entry}
                    onDeleteClick={onDeleteClick}/>
            );
        });

        return (
            <Card>
                <CardHeader
                    title={`${selectedEntries.length} Selected:`}/>

                <CardMedia>
                    { list }
                </CardMedia>

                <CardActions>
                    <FlatButton
                        label='CLear'
                        onTouchTap={onClearClick}/>
                </CardActions>
            </Card>
        );
    }
}

EntrySelection.propTypes = {
    /* array of selected entries */
    selectedEntries: React.PropTypes.array.isRequired,
    /* callbacks */
    onClearClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
};

module.exports = EntrySelection;
