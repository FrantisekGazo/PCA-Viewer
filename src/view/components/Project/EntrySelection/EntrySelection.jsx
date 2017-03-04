"use strict";

const React = require('react');
const { Card, CardHeader, CardActions, CardMedia } = require('material-ui/Card');
const FlatButton = require('material-ui/FlatButton').default;

const SelectedEntry = require('./SelectedEntry.jsx');


class EntrySelection extends React.Component {

    handleDeleteAll() {
        const { selectedEntries, onDeleteClick } = this.props;
        onDeleteClick(selectedEntries.map(e => e.id));
    }

    render() {
        const { selectedEntries, deletable, onClearClick, onDeleteClick } = this.props;

        const list = selectedEntries.map(entry => {
            return (
                <SelectedEntry
                    key={`${entry.id}`}
                    entry={entry}
                    deletable={deletable}
                    onDeleteClick={onDeleteClick}/>
            );
        });

        const deleteButton = (
            <FlatButton
                label='Delete All'
                onTouchTap={this.handleDeleteAll.bind(this)}/>
        );

        return (
            <Card>
                <CardHeader
                    title={`${selectedEntries.length} Selected:`}/>

                <CardMedia>
                    { list }
                </CardMedia>

                <CardActions>
                    <FlatButton
                        label='Clear'
                        onTouchTap={onClearClick}/>
                    { deletable ? deleteButton : null }
                </CardActions>
            </Card>
        );
    }
}

EntrySelection.propTypes = {
    /* array of selected entries */
    selectedEntries: React.PropTypes.array.isRequired,
    /* true if entries are deletable */
    deletable: React.PropTypes.bool.isRequired,
    /* callbacks */
    onClearClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
};

module.exports = EntrySelection;
