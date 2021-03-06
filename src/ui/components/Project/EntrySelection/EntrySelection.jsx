"use strict";

const React = require('react');
const { Card, CardHeader, CardActions, CardMedia } = require('material-ui/Card');
const FlatButton = require('material-ui/FlatButton').default;

const SelectedEntryList = require('./SelectedEntryList.jsx');


/**
 * React component that shows list of selected entries and options for clear/delete.
 */
class EntrySelection extends React.Component {

    handleDeleteAll() {
        const { selectedEntries, onDeleteClick } = this.props;
        onDeleteClick(selectedEntries.map(e => e.id));
    }

    render() {
        const { selectedEntries, deletable, onDeselect } = this.props;

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
                    <SelectedEntryList
                        entries={selectedEntries}
                        onDeselect={onDeselect}/>
                </CardMedia>

                <CardActions>
                    <FlatButton
                        label='Clear'
                        onTouchTap={() => onDeselect(null)}/>
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
    onDeselect: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
};

module.exports = EntrySelection;
