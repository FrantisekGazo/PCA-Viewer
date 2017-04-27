"use strict";

const React = require('react');
const Checkbox = require('material-ui/Checkbox').default;
const RaisedButton = require('material-ui/RaisedButton').default;
const MenuItem = require('material-ui/MenuItem').default;
const SelectField = require('material-ui/SelectField').default;
const Snackbar = require('material-ui/Snackbar').default;

const { copyArray } = require('../../../../util');


const styles = {
    select: {
        width: '80px'
    }
};


/**
 * React component that shows a selector for used eigenpairs.
 */
class EigenvaluesSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
            snackbarMsg: '',
        };
    }

    onChange(index, value) {
        const newSelection = copyArray(this.state.selected);
        newSelection[index] = value;
        this.setState({
            selected: newSelection
        });
    }

    onUpdateClick() {
        const selection = copyArray(this.state.selected);

        if (selection.length < 2) {
            this.setState({
                snackbarMsg: 'At least 2 eigenvalues must be selected!'
            });
            return;
        }

        // remove empty selection (if exists)
        if (selection.length > 2 && selection[2] === -1) {
            selection.splice(2, 1);
        }

        if (selection.length > 2) {
            if (selection[0] === selection[1] || selection[1] === selection[2] || selection[0] === selection[2]) {
                this.setState({
                    snackbarMsg: 'Selected eigenvalues must be different!'
                });
                return;
            }
        } else {
            if (selection[0] === selection[1]) {
                this.setState({
                    snackbarMsg: 'Selected eigenvalues must be different!'
                });
                return;
            }
        }

        this.props.onSelectionChange(selection);
    }

    showMessage(text) {
        this.setState({
            snackbarMsg: text,
        });
    };

    onSnackbarClose() {
        this.setState({
            snackbarMsg: '',
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.eigenvalues !== nextProps.eigenvalues
            || this.props.selected !== nextProps.selected
            || this.state.snackbarMsg !== nextState.snackbarMsg
            || this.state.selected !== nextState.selected;
    }

    render() {
        const { eigenvalues } = this.props;
        const { selected } = this.state;

        let i = 0;
        const eigensMenuItems = eigenvalues
            .map(v => {
                const index = i++;
                const text = `${index}`;
                return (
                    <MenuItem key={index} value={index} primaryText={text}/>
                );
            });

        return (
            <div style={{ padding: '10px' }}>
                <div style={{ paddingBottom: '10px' }}>
                    Select 2 or 3 eigenvalues:
                </div>

                <SelectField
                    value={selected[0]}
                    style={styles.select}
                    onChange={(event, value) => this.onChange(0, value)}>
                    { eigensMenuItems }
                </SelectField>

                <SelectField
                    value={selected[1]}
                    style={styles.select}
                    onChange={(event, value) => this.onChange(1, value)}>
                    { eigensMenuItems }
                </SelectField>

                <SelectField
                    value={selected.length > 2 ? selected[2] : -1}
                    style={styles.select}
                    onChange={(event, index, value) => this.onChange(2, value)}>
                    <MenuItem key={-1} value={-1} primaryText='---'/>
                    { eigensMenuItems }
                </SelectField>

                <br/>
                <RaisedButton label='Update' onTouchTap={this.onUpdateClick.bind(this)}/>

                <Snackbar
                    open={this.state.snackbarMsg !== ''}
                    message={this.state.snackbarMsg}
                    autoHideDuration={2000}
                    onRequestClose={this.onSnackbarClose.bind(this)}/>
            </div>
        );
    }
}

EigenvaluesSelector.propTypes = {
    eigenvalues: React.PropTypes.array.isRequired,
    selected: React.PropTypes.array.isRequired,
    onSelectionChange: React.PropTypes.func.isRequired,
};

module.exports = EigenvaluesSelector;
