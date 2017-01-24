const React = require("react");
const ReactDOM = require("react-dom");

const createClassName = require("../util/classnames");
const FineTune = require("./FineTune.jsx");
const { ColorSwatch, SwatchItem } = require('./Swatch.jsx');

//From material-ui
const Dialog = require('material-ui/Dialog').default;
const FlatButton = require('material-ui/FlatButton').default;
const Avatar = require('material-ui/Avatar').default;


const DEFAULT_COLORS = [
    "#1ABC9C",
    "#16A085",
    "#2ECC71",
    "#27AE60",
    "#3498DB",
    "#2980B9",
    "#9B59B6",
    "#8E44AD",
    "#34495E",
    "#2C3E50",
    "#F1C40F",
    "#F39C12",
    "#E67E22",
    "#D35400",
    "#E74C3C",
    "#C0392B",
    "#ECF0F1",
    "#BDC3C7",
    "#95A5A6",
    "#7F8C8D"
];

const ColorPicker = React.createClass({

    getInitialState() {
        const colors = DEFAULT_COLORS.slice();
        colors[0] = this.props.value;
        return {
            colors: colors,
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
            <div style={{display: "inline-block"}}>
                <Avatar
                    color="#fff"
                    backgroundColor={this.state.selectedColor}
                    onTouchTap={this.onClick}
                    size={40}
                    style={{margin: 5}}>
                    {this.props.letter}
                </Avatar>
                {/*<SwatchItem*/}
                    {/*color={this.state.selectedColor}*/}
                    {/*onClick={this.onClick}/>*/}
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
        const colors = this.state.colors.slice();
        colors[this.state.selected] = color;
        this.setState({colors});
    }

});

module.exports = ColorPicker;
