const React = require("react");
const ReactDOM = require("react-dom");

const createClassName = require("../util/classnames");
const FineTune = require("./FineTune.jsx");
const { ColorSwatch, SwatchItem } = require('./Swatch.jsx');

//From material-ui
const Dialog = require('material-ui/Dialog').default;
const FlatButton = require('material-ui/FlatButton').default;


const ColorPicker = React.createClass({

    getInitialState() {
        return {
            colors: this.props.colors,
            selected: 0,
            showPicker: false,
            selectedColor: this.props.value,
        };
    },

    onClick: function () {
        this.setState({showPicker: true});
    },
    handleClose: function () {
        this.setState({showPicker: false});
    },
    render() {
        const selectedColor = this.state.colors[this.state.selected];
        const classes = createClassName({"swatch-item": true});
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.handleClose}/>,
            <FlatButton
                label="Select"
                primary={true}
                onClick={this.handleColorSelected}/>,
        ];

        return (
            <div>
                <SwatchItem
                    color={this.state.selectedColor}
                    onClick={this.onClick}/>
                <Dialog contentStyle={{width: '300px'}} actions={actions} modal={true} open={this.state.showPicker}>
                    <div>
                        <FineTune
                            color={this.state.colors[this.state.selected]}
                            opacitySlider={true}
                            onChange={this.handleColorChange}/>
                    </div>
                    <div>
                        <ColorSwatch
                            colors={this.state.colors}
                            selected={this.state.selected}
                            onSelect={this.handleColorSelect}/>
                    </div>
                </Dialog>
            </div>
        );
    },

    handleColorSelect(selected) {
        this.setState({selected});
    },

    handleColorSelected() {
        const selectedColor = this.state.colors[this.state.selected];
        this.setState({showPicker: false, showFineTune: false, selectedColor: selectedColor});
        this.props.onChange(this.state.colors[this.state.selected]);
    },

    handleFineTune() {
        this.setState({showFineTune: true})
    },

    handleColorChange(color) {
        const colors = [...this.state.colors];
        colors[this.state.selected] = color;
        this.setState({colors});
    }

});

module.exports = ColorPicker;
