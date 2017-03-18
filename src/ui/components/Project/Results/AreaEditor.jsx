"use strict";

const React = require('react');
const { CardActions } = require('material-ui/Card');
const IconButton = require('material-ui/IconButton').default;
const IconVisible = require('material-ui/svg-icons/action/visibility').default;
const IconInvisible = require('material-ui/svg-icons/action/visibility-off').default;
const RaisedButton = require('material-ui/RaisedButton').default;
const TextField = require('material-ui/TextField').default;


/**
 * React component that shows area editor options
 */
class AreaEditor extends React.Component {

    constructor(props) {
        super(props);
        this.k = props.coefficient;
    }

    handleCoefChange(event, newValue) {
        const number = parseFloat(newValue);
        if (!isNaN(number)) {
            this.k = number;
        }
    }

    handleUpdateClick() {
        this.props.onCoefficientChange(this.k);
    }

    handleToggleShown() {
        this.props.onShownChange(!this.props.shown);
    }

    render() {
        const { shown } = this.props;

        return (
            <CardActions>
                <IconButton
                    onTouchTap={this.handleToggleShown.bind(this)}>
                    {
                        shown ? <IconVisible/> : <IconInvisible/>
                    }
                </IconButton>

                <TextField
                    disabled={!shown}
                    floatingLabelText='k'
                    defaultValue={`${this.k}`}
                    onChange={this.handleCoefChange.bind(this)}/>

                <RaisedButton
                    disabled={!shown}
                    label='Update'
                    onTouchTap={this.handleUpdateClick.bind(this)}/>
            </CardActions>
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
