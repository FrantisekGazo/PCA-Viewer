"use strict";

const { combineReducers } = require("redux");
const { routerReducer } = require('react-router-redux');

const { project } = require("./project");


module.exports = combineReducers({
    project: project,
    routing: routerReducer
});
