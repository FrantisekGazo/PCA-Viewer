"use strict";

const update = require('immutability-helper');

const {Actions} = require('../actions/tester');


const initState = {
    text: "",
    error: ""
};
const tester = (state = initState, action) => {
    switch (action.type) {
        case Actions.SHOW_TEXT: {
            return update(state, {
                $merge: {
                    text: action.payload
                }
            });
        }
        case Actions.SHOW_ERROR: {
            return update(state, {
                $merge: {
                    error: action.payload
                }
            });
        }
        default:
            return state;
    }
};

module.exports = {
    tester
};
