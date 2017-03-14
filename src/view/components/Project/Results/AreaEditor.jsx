"use strict";

const React = require('react');
const {Card} = require('material-ui/Card');


/**
 * Shows area editor options
 */
class AreaEditor extends React.Component {

    render() {
        const {
            coefficient, shown,
            onShownChange, onCoefficientChange
        } = this.props;

        return (
            <div>
                k = { coefficient }
                [{ shown ? "shown" : "hidden" }]
            </div>
        );
    }
}

AreaEditor.propTypes = {
    coefficient: React.PropTypes.number.isRequired,
    shown: React.PropTypes.bool.isRequired,
    // callbacks
    onShownChange: React.PropTypes.func.isRequired,
    onCoefficientChange: React.PropTypes.func.isRequired,
};

module.exports = AreaEditor;
