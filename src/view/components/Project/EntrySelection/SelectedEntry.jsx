"use strict";

const React = require('react');


class SelectedEntry extends React.Component {

    render() {
        const { entry } = this.props;

        return (
            <div>
                { `${entry}` }
            </div>
        );
    }

}

SelectedEntry.propTypes = {
    entry: React.PropTypes.number.isRequired,
};

module.exports = SelectedEntry;
