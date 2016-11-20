"use strict";

const {createAction} = require('./index');


const Actions = {
    COUNTER_INC: 'COUNTER_INC',
    COUNTER_DEC: 'COUNTER_DEC',
};

function increment() {
    return createAction(Actions.COUNTER_INC);
}

function decrement() {
    return createAction(Actions.COUNTER_DEC);
}

module.exports = {
    Actions,
    increment,
    decrement
};
