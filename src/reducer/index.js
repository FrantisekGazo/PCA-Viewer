"use strict";

const { combineReducers } = require("redux");
const { routerReducer } = require('react-router-redux');

const { project } = require("./ProjectReducer");


module.exports = combineReducers({
    project: project,
    routing: routerReducer
});
