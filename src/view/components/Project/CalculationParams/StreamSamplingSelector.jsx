"use strict";

const React = require('react');
const Subheader = require('material-ui/Subheader').default;
const TextField = require('material-ui/TextField').default;
const FlatButton = require('material-ui/FlatButton').default;


class StreamSamplingSelector extends React.Component {

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
            <div>
                <div
                    style={{
                        paddingLeft: '20px',
                        marginBottom: '-20px',
                    }}>
                    <TextField
                        floatingLabelText='Sampling'
                        id="sampling-value"
                        defaultValue={`${sampling}`}
                        onChange={this.handleValueChange.bind(this)}/>
                </div>

                <br/>
                <FlatButton
                    label='Update'
                    onTouchTap={this.handleUpdateClick.bind(this)}/>

                <span style={{color: '#cc0000'}}>{ errorMessage }</span>
            </div>
        );
    }
}

StreamSamplingSelector.propTypes = {
    sampling: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
};

module.exports = StreamSamplingSelector;
