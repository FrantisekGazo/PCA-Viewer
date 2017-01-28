"use strict";

const React = require('react');
const DropDownMenu = require('material-ui/DropDownMenu').default;
const MenuItem = require('material-ui/MenuItem').default;
const TextField = require('material-ui/TextField').default;
const FlatButton = require('material-ui/FlatButton').default;


class StreamTransformationPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: props.transformation.type ? props.transformation.type : 0,
            value: props.transformation.value ? props.transformation.value : 0,
            errorMessage: ''
        };
    }

    handleTypeChange(event, index, type) {
        this.setState({
            type: type,
            // value: '', do not clear because it's only for time interval
            errorMessage: ''
        });
    }

    handleValueChange(event, value) {
        const number = parseFloat(value);
        if (!isNaN(number)) {
            this.setState({
                value: number,
                errorMessage: ''
            });
        } else {
            this.setState({
                value: 0,
                errorMessage: ''
            });
        }
    }

    handleUpdateClick() {
        const { type, value } = this.state;
        if (type === 2 && value === 0) {
            this.setState({
                errorMessage: 'Invalid value!',
            });
            return;
        }

        this.props.onChange(this.state);
    }

    render() {
        const {type, value, errorMessage} = this.state;

        let input = null;

        if (type === 2) {
            input = (
                <TextField
                    key={`transformation-value-${type}`}
                    floatingLabelText={"time interval"}
                    style={{width: '100px'}}
                    defaultValue={`${value}`}
                    onChange={this.handleValueChange.bind(this)}/>
            );
        }

        return (
            <div style={{padding: '5px'}}>

                <DropDownMenu labelStyle={{marginBottom: '-18px'}}
                              value={type}
                              onChange={this.handleTypeChange.bind(this)}>

                    <MenuItem value={0} key={0} primaryText="Transformation"/>
                    <MenuItem value={1} key={1} primaryText="Diff"/>
                    <MenuItem value={2} key={2} primaryText="Count in"/>

                </DropDownMenu>

                { input }

                <br/>
                <FlatButton
                    label='Update'
                    onTouchTap={this.handleUpdateClick.bind(this)}/>

                <span style={{ color: '#cc0000' }}>{ errorMessage }</span>
            </div>
        );
    }
}

StreamTransformationPicker.propTypes = {
    transformation: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
};

module.exports = StreamTransformationPicker;
