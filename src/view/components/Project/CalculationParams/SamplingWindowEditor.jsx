"use strict";

const React = require('react');
const Subheader = require('material-ui/Subheader').default;
const TextField = require('material-ui/TextField').default;
const IconButton = require('material-ui/IconButton').default;
const IconArrowLeft = require('material-ui/svg-icons/hardware/keyboard-arrow-left').default;
const IconArrowRight = require('material-ui/svg-icons/hardware/keyboard-arrow-right').default;
const FlatButton = require('material-ui/FlatButton').default;


const styles = {
    edt: {
        width: '100px',
        margin: '20px',
    },
    text: {
        display: 'inline-block',
        fontSize: 28
    }
};

class SamplingWindowEditor extends React.Component {

    constructor(props) {
        super(props);
        const { samplingWindow } = props;
        this.state = {
            size: samplingWindow.size,
            start: samplingWindow.start,
            overlay: samplingWindow.overlay,
            fixedCount: samplingWindow.fixedCount,
            additionalCount: samplingWindow.additionalCount,
            errorMessage: ''
        };
    }

    handleSizeChange(event, newValue) {
        const num = parseInt(newValue);
        if (!isNaN(num) && this.state.size !== num) {
            this.setState({
                size: num,
                errorMessage: ''
            });
        }
    }

    handleOverlayChange(event, newValue) {
        const num = parseInt(newValue);
        if (!isNaN(num) && this.state.overlay !== num) {
            this.setState({
                overlay: num,
                errorMessage: ''
            });
        }
    }

    handleStartChange(event, newValue) {
        const num = parseInt(newValue);
        if (!isNaN(num) && this.state.start !== num) {
            this.setState({
                start: num,
                errorMessage: ''
            });
        }
    }

    handleFixedCountChange(event, newValue) {
        const num = parseInt(newValue);
        if (!isNaN(num) && this.state.fixedCount !== num) {
            this.setState({
                fixedCount: num,
                errorMessage: ''
            });
        }
    }

    handleAddAdditionalCountChange() {
        this.setState({
            additionalCount: this.state.additionalCount + 1,
            errorMessage: ''
        });
    }

    handleSubAdditionalCountChange() {
        this.setState({
            additionalCount: Math.max(this.state.additionalCount - 1, 0),
            errorMessage: ''
        });
    }

    handleUpdateClick() {
        const { size, overlay, start, fixedCount } = this.state;

        if (size <= 3) {
            this.setState({
                errorMessage: 'Sampling has to be > 3'
            });
        } else if (overlay < 0) {
            this.setState({
                errorMessage: 'Overlay has to be >= 0'
            });
        } else if (overlay >= size) {
            this.setState({
                errorMessage: 'Overlay has to be < Sampling'
            });
        } else if (start < 0) {
            this.setState({
                errorMessage: 'Start has to be >= 0'
            });
        } else if (fixedCount <= 0) {
            this.setState({
                errorMessage: 'Fixed count has to be > 0'
            });
        } else {
            this.props.onChange(this.state);
        }
    }

    render() {
        const { size, overlay, start, fixedCount, additionalCount, errorMessage } = this.state;

        return (
            <div>
                <TextField
                    style={styles.edt}
                    id='start-index'
                    floatingLabelText={'Start'}
                    defaultValue={`${start}`}
                    onChange={this.handleStartChange.bind(this)}/>

                <TextField
                    style={styles.edt}
                    id='start-index'
                    floatingLabelText={'Sampling'}
                    defaultValue={`${size}`}
                    onChange={this.handleSizeChange.bind(this)}/>

                <TextField
                    style={styles.edt}
                    id='overlay'
                    floatingLabelText={'Overlay'}
                    defaultValue={`${overlay}`}
                    onChange={this.handleOverlayChange.bind(this)}/>

                <TextField
                    style={styles.edt}
                    id='fixed-count'
                    floatingLabelText={'Fixed count'}
                    defaultValue={`${fixedCount}`}
                    onChange={this.handleFixedCountChange.bind(this)}/>

                <Subheader>Additional samples:</Subheader>

                <IconButton
                    id='additional-count-add'
                    onTouchTap={this.handleSubAdditionalCountChange.bind(this)}>
                    <IconArrowLeft/>
                </IconButton>

                <div style={styles.text}>{additionalCount}</div>

                <IconButton
                    id='additional-count-add'
                    onTouchTap={this.handleAddAdditionalCountChange.bind(this)}>
                    <IconArrowRight/>
                </IconButton>

                <br/>

                <FlatButton
                    label='Update'
                    onTouchTap={this.handleUpdateClick.bind(this)}/>
                <span style={{color: '#cc0000'}}>{ errorMessage }</span>
            </div>
        );
    }
}

SamplingWindowEditor.propTypes = {
    /* sampling window */
    samplingWindow: React.PropTypes.object.isRequired,
    /* callbacks */
    onChange: React.PropTypes.func.isRequired,
};

module.exports = SamplingWindowEditor;
