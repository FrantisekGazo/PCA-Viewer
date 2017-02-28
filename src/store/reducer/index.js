"use strict";

const { combineReducers } = require("redux");
const { routerReducer } = require('react-router-redux');

const { calculation } = require("./CalculationReducer");
const { project } = require("./ProjectReducer");


// Combine all reducers
module.exports = combineReducers({
    calculation: calculation,
    project: project,
    routing: routerReducer
});
