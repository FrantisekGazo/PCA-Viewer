"use strict";

const React = require('react');
const Dialog = require('material-ui/Dialog').default;
const FlatButton = require('material-ui/FlatButton').default;
const TextField = require('material-ui/TextField').default;


/**
 * Shows a dialog for manually adding a new entry.
 */
class AddEntryDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        };
        this.values = {};
    }

    changeValue(index, value) {
        const number = parseFloat(value);
        if (!isNaN(number)) {
            this.values[index] = value;
            this.setState({
                errors: Object.assign({}, this.state.errors, {[index]: undefined})
            });
        }
    }

    handleAddClick() {
        const { sampling, onAdd } = this.props;

        const values = [];
        const newErrors = {};
        let valid = true;
        for (let i = 0; i < sampling; i++) {
            const value = this.values[i];
            if (value === undefined) {
                newErrors[i] = 'Enter a number';
                valid = false;
            }
            values.push(value);
        }

        if (valid) {
            onAdd(values);
        } else {
            this.setState({
                errors: newErrors
            });
        }
    }

    render() {
        const { errors } = this.state;
        const { open, sampling, onClose } = this.props;

        const textFields = [];
        for (let i = 0; i < sampling; i++) {
            textFields.push(
                <TextField
                    key={`add-value-${i}`}
                    errorText={errors[i]}
                    floatingLabelText={`Value ${i + 1}`}
                    onChange={(e, newValue) => this.changeValue(i, newValue)}/>
            );
            textFields.push(<br key={`add-br-${i}`}/>);
        }

        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={onClose}/>,
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleAddClick.bind(this)}/>
        ];

        return (
            <Dialog
                title="New entry"
                actions={actions}
                modal={false}
                autoScrollBodyContent={true}
                open={open}
                onRequestClose={onClose}>
                { textFields }
            </Dialog>
        );
    }
}

AddEntryDialog.propTypes = {
    /* true if the dialog should be open */
    open: React.PropTypes.bool.isRequired,
    /* size of the sampling window (if it is constant) */
    sampling: React.PropTypes.number.isRequired,
    /* callbacks */
    onClose: React.PropTypes.func.isRequired,
    onAdd: React.PropTypes.func.isRequired,
};

module.exports = AddEntryDialog;
