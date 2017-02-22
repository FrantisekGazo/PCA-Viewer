"use strict";

const { createLogic } = require('redux-logic');

const ProjectAction = require('../action/ProjectAction');
const RouterAction = require('../action/RouterAction');
const ProjectSelector = require('../store/selector/ProjectSelector');
const { PROJECT_TYPE } = require('../store/Constants');


/**
 * Navigates to the correct project screen depending on project type.
 */
const openProjectScreen = createLogic({
    type: ProjectAction.ACTIONS.SET_PROJECT,
    process({ getState, action }, dispatch, done) {
        const state = getState();
        const type = ProjectSelector.getType(state);
        const hasConstantSampling = ProjectSelector.hasConstantSampling(state);

        if (type === PROJECT_TYPE.ONLINE_PCA) {
            dispatch(RouterAction.createGoToProjectScreenOnlineAction());
        } else if (hasConstantSampling) {
            dispatch(RouterAction.createGoToProjectScreenOfflineConstantAction());
        } else {
            dispatch(RouterAction.createGoToProjectScreenOfflineAction());
        }
        done();
    }
});

/**
 * Navigates back to the start screen.
 */
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
