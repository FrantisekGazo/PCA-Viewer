"use strict";

const { combineReducers } = require("redux");

const { counter } = require("./counter");
const { tester } = require("./tester");
const { project } = require("./project");


module.exports = combineReducers({
    counter,
    tester,
    project
});
