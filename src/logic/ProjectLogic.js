"use strict";

const { createLogic } = require('redux-logic');

const ProjectAction = require('../action/ProjectAction');
const RouterAction = require('../action/RouterAction');


const openProjectScreen = createLogic({
    type: ProjectAction.ACTIONS.SET_PROJECT,
    process({ getState, action }, dispatch, done) {
        dispatch(RouterAction.createGoToProjectScreenAction());
        done();
    }
});

const closeProjectScreen = createLogic({
    type: ProjectAction.ACTIONS.CLOSE_PROJECT,
    process({ getState, action }, dispatch, done) {
        dispatch(RouterAction.createGoToStartScreenAction());
        done();
    }
});


module.exports = [
    openProjectScreen,
    closeProjectScreen,
];
