"use strict";

const React = require('react');
const {connect} = require('react-redux');

const Counter = require('../components/Counter.jsx');
const {increment, decrement} = require('../../actions/counter');


const ConnectedCounter = connect(
    // state to props
    (state) => {
        return {value: state.counter.number};
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onIncClicked: () => {
                dispatch(increment())
            },
            onDecClicked: () => {
                dispatch(decrement())
            }
        };
    }
)(Counter);

module.exports = ConnectedCounter;
