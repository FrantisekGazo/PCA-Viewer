"use strict";

const React = require('react');
const Checkbox = require('material-ui/Checkbox').default;
const RaisedButton = require('material-ui/RaisedButton').default;
const Snackbar = require('material-ui/Snackbar').default;

const { sortNumArrayAsc } = require('../../util/util');


class EigenvaluesSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
            snackbarMsg: '',
        };
    }

    onCheck(index, checked) {
        const { selected } = this.state;

        if (!checked) {
            this.setState({
                selected: selected.filter(i => i !== index)
            });
        } else if (checked && selected.length < 3) {
            this.setState({
                selected: [index].concat(selected)
            });
        } else {
            this.setState({
                snackbarMsg: 'More than 3 eigenvalues cannot be selected!'
            });
        }
    }

    onUpdateClick() {
        const { selected } = this.state;
        if (selected.length < 2) {
            this.setState({
                snackbarMsg: 'At least 2 eigenvalues must be selected!'
            });
            return;
        }

        this.props.onSelectionChange(sortNumArrayAsc(selected));
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

    render() {
        const { eigenvalues } = this.props;
        const { selected } = this.state;

        let i = 0;
        const eigenvaluesPickers = eigenvalues.map(v => {
            const index = i++;
            const stringIndex = `${index}`;
            return (
                <Checkbox
                    key={stringIndex}
                    checked={selected.indexOf(index) >= 0}
                    label={stringIndex}
                    onCheck={(event, newValue) => this.onCheck(index, newValue)}
                    style={{ display: 'inline-block', width: '70px' }}/>
            );
        });

        return (
            <div style={{ padding: '10px' }}>
                <div style={{ paddingBottom: '10px' }}>
                    Select 2 or 3 eigenvalues:
                </div>

                { eigenvaluesPickers }

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
