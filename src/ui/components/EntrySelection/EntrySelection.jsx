"use strict";

const React = require('react');
const { Card, CardHeader, CardActions } = require('material-ui/Card');
const FlatButton = require('material-ui/FlatButton').default;


class EntrySelection extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { selectedEntryIds, onClearClicked } = this.props;

        return (
            <Card>
                <CardHeader
                    title={`${selectedEntryIds.length} Selected:`}/>

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
