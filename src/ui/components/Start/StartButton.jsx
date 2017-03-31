"use strict";

const React = require('react');
const RaisedButton = require('material-ui/RaisedButton').default;


const styles = {
    option: {
        display: 'inline-block',
        margin: '5px',
        height: '180px',
        width: '250px',
    },
    icon: {
        position: 'relative',
        top: '20px',
        width: '100px',
        height: '100px',
    },
    text: {
        position: 'relative',
        top: '10px',
    }
};


/**
 * React component that shows a start screen button.
 */
class StartButton extends React.Component {

    render() {
        const { label, iconComponent, onClick } = this.props;
        return (
            <RaisedButton
                style={styles.option}
                onTouchTap={onClick}>

                { React.createElement(iconComponent, {style: styles.icon}) }
                <p style={styles.text}>{label}</p>
            </RaisedButton>
        );
    }
}

StartButton.propTypes = {
    label: React.PropTypes.string.isRequired,
    iconComponent: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired
};

module.exports = StartButton;
