"use strict";

const React = require('react');


const Counter = ({value, onIncClicked, onDecClicked}) => {
    return (
        <div>
            <h2>Counter: {value}</h2>
            <button onClick={onIncClicked}>+</button>
            <button onClick={onDecClicked}>-</button>
        </div>
    )
};

Counter.propTypes = {
    value: React.PropTypes.number.isRequired,
    onIncClicked: React.PropTypes.func.isRequired,
    onDecClicked: React.PropTypes.func.isRequired
};

module.exports = Counter;
