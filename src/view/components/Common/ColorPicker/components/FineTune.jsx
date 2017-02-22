const React = require("react");

const createClassName = require("../util/classnames");
const ColorUtils = require("../util/ColorUtils");
const PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
const Map = require("./Map.jsx");
const Slider = require("./Slider.jsx");


const ColorPicker = React.createClass({

    mixins: [PureRenderMixin],

    propTypes: {
        color: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps() {
        return {
            color: "rgba(0,0,0,1)",
            opacitySlider: false
        };
    },

    getInitialState() {
        return this.getStateFrom(this.props);
    },

    componentWillReceiveProps(nextProps) {
        const nextState = this.getStateFrom(nextProps);

        if (!ColorUtils.equals(this.state.color, nextState.color)) {
            this.setState(nextState);
        }
    },

    getStateFrom(props) {
        return {
            color: ColorUtils.parseToHsv(props.color)
        };
    },

    render() {
        const classes = createClassName({"colorpicker": true, "with-opacity-slider": this.props.opacitySlider});
        const [hue, saturation, value] = this.state.color;

        return (
            <div className={classes}>
                {this.props.opacitySlider && (
                    <div className="opacity-slider">
                        <Slider
                            vertical={false}
                            value={this.getAlpha()}
                            max={1}
                            background={this.getBackgroundGradient()}
                            onChange={this.handleAlphaChange}/>
                    </div>
                )}

                <Map
                    x={saturation}
                    y={value}
                    max={100}
                    className={ColorUtils.isDark(this.state.color) ? "dark" : "light"}
                    backgroundColor={this.getBackgroundHue()}
                    onChange={this.handleSaturationValueChange}/>

            </div>
        );
    },

    getAlpha() {
        return this.state.color[3] === undefined ? 1 : this.state.color[3];
    },

    getBackgroundGradient() {
        const [h, s, v] = this.state.color;
        const opaque = ColorUtils.toRgbString([h, s, v, 1]);

        return `linear-gradient(to right, rgba(0,0,0,0) 0%, ${opaque} 100%)`;
    },

    getBackgroundHue() {
        return ColorUtils.toRgbString([this.state.color[0], 100, 100]);
    },

    handleAlphaChange(alpha) {
        const [h, s, v] = this.state.color;
        this.update([h, s, v, alpha]);
    },

    handleHueChange(hue) {
        const [, s, v, a] = this.state.color;
        this.update([hue, s, v, a]);
    },

    handleSaturationValueChange(saturation, value) {
        const [h, , , a] = this.state.color;
        this.update([h, saturation, value, a]);
    },

    update(color) {
        this.setState({color: color});
        this.props.onChange(ColorUtils.toRgbString(color));
    }

});

module.exports = ColorPicker;