"use strict";

const { combineReducers } = require("redux");
const { routerReducer } = require('react-router-redux');

const { tester } = require("./tester");
const { project } = require("./project");


module.exports = combineReducers({
    tester,
    project,
    routing: routerReducer
});
