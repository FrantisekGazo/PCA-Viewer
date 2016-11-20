"use strict";

const { combineReducers } = require("redux");

const { counter } = require("./counter");
const { tester } = require("./tester");


module.exports = combineReducers({
    counter,
    tester
});
