"use strict";

const React = require('react');
const Subheader = require('material-ui/Subheader').default;
const TextField = require('material-ui/TextField').default;
const IconButton = require('material-ui/IconButton').default;
const IconArrowLeft = require('material-ui/svg-icons/hardware/keyboard-arrow-left').default;
const IconArrowRight = require('material-ui/svg-icons/hardware/keyboard-arrow-right').default;


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

class StreamWindowSelector extends React.Component {

    handleStartChange(event, newValue) {
        const { start, onStartChange } = this.props;

        const num = parseInt(newValue);
        if (!isNaN(num) && start !== num) {
            onStartChange(num);
        }
    }

    handleFixedCountChange(event, newValue) {
        const { fixedCount, onFixedCountChange } = this.props;

        const num = parseInt(newValue);
        if (!isNaN(num) && fixedCount !== num) {
            onFixedCountChange(num);
        }
    }

    render() {
        const {
            start, fixedCount, additionalCount, onAdditionalCountChange
        } = this.props;

        return (
            <div>
                <TextField
                    style={styles.edt}
                    id='start-index'
                    floatingLabelText={'Start'}
                    value={`${start}`}
                    onChange={this.handleStartChange.bind(this)}/>

                <TextField
                    style={styles.edt}
                    id='fixed-count'
                    floatingLabelText={'Fixed count'}
                    value={`${fixedCount}`}
                    onChange={this.handleFixedCountChange.bind(this)}/>

                <Subheader>Additional samples:</Subheader>

                <IconButton
                    id='additional-count-add'
                    onTouchTap={() => onAdditionalCountChange(additionalCount - 1)}>
                    <IconArrowLeft/>
                </IconButton>

                <div style={styles.text}>{additionalCount}</div>

                <IconButton
                    id='additional-count-add'
                    onTouchTap={() => onAdditionalCountChange(additionalCount + 1)}>
                    <IconArrowRight/>
                </IconButton>
            </div>
        );
    }
}

StreamWindowSelector.propTypes = {
    /* stream index where sampling starts */
    start: React.PropTypes.number.isRequired,
    /* number of fixed samples */
    fixedCount: React.PropTypes.number.isRequired,
    /* number of additional samples */
    additionalCount: React.PropTypes.number.isRequired,
    /* callbacks */
    onStartChange: React.PropTypes.func.isRequired,
    onFixedCountChange: React.PropTypes.func.isRequired,
    onAdditionalCountChange: React.PropTypes.func.isRequired,
};

module.exports = StreamWindowSelector;
