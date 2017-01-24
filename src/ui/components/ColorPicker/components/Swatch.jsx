const React = require('react');
const PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");

const createClassName = require("../util/classnames");


const SwatchItem = React.createClass({

    mixins: [PureRenderMixin],

    render() {
        const classes = createClassName({"swatch-item": true, "swatch-selected": this.props.selected});

        const backgroundColor = this.props.color;
        return (
            <button
                className={classes}
                style={{backgroundColor}}
                onClick={this.handleClick}/>
        );
    },

    handleClick(e) {
        e.preventDefault();
        this.props.onClick(this.props.id);
    }

});


const ColorSwatch = React.createClass({

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return {
            colors: [],
            selected: null
        };
    },

    render() {
        return (
            <div className='swatch' style={{ height: '100px' }}>
                {this.props.colors.map(this.buildSwatch)}
            </div>
        );
    },

    buildSwatch(color, i) {
        return (
            <SwatchItem
                color={color}
                key={i}
                id={i}
                onClick={this.props.onSelect}
                selected={this.props.selected === i}/>
        );
    }

});

module.exports = {
    ColorSwatch,
    SwatchItem
};
