"use strict";

const React = require('react');
const Subheader = require('material-ui/Subheader').default;
const TextField = require('material-ui/TextField').default;
const FlatButton = require('material-ui/FlatButton').default;


const styles = {
    edt: {
        width: '100px'
    }
};

/**
 * Shows a TextField for changing the size of the sampling window.
 */
class StreamWindowSizeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sampling: props.sampling,
            errorMessage: ''
        };
    }

    handleValueChange(event, newValue) {
        const number = parseFloat(newValue);
        if (!isNaN(number)) {
            this.setState({
                sampling: number,
                errorMessage: ''
            });
        }
    }

    handleUpdateClick() {
        const { sampling } = this.state;

        if (sampling > 3) {
            this.props.onChange(sampling);
        } else {
            this.setState({
                errorMessage: 'Sampling has to be greater that 3'
            });
        }
    }

    render() {
        const { sampling, errorMessage } = this.state;

        return (
            <div
                style={{
                    paddingLeft: '20px',
                    paddingBottom: '10px',
                }}>
                <TextField
                    style={styles.edt}
                    floatingLabelText='Sampling'
                    id="sampling-value"
                    defaultValue={`${sampling}`}
                    onChange={this.handleValueChange.bind(this)}/>
                <FlatButton
                    label='Update'
                    onTouchTap={this.handleUpdateClick.bind(this)}/>

                <br/>
                <span style={{color: '#cc0000'}}>{ errorMessage }</span>
            </div>
        );
    }
}

StreamWindowSizeEditor.propTypes = {
    /* size of the sampling window */
    sampling: React.PropTypes.number.isRequired,
    /* callbacks */
    onChange: React.PropTypes.func.isRequired,
};

module.exports = StreamWindowSizeEditor;
