"use strict";

const update = require('immutability-helper');

const {Actions} = require('../actions/counter');


const initState = {
    number: 0
};
const counter = (state = initState, action) => {
    switch (action.type) {
        case Actions.COUNTER_INC: {
            const i = state.number;
            return update(state, {
                $merge: {
                    number: (i + 1)
                }
            });
        }
        case Actions.COUNTER_DEC: {
            const i = state.number;
            return update(state, {
                $merge: {
                    number: (i - 1)
                }
            });
        }
        default:
            return state;
    }
};

module.exports = {
    counter
};
