"use strict";

const { replace, push, goBack } = require('react-router-redux');


/**
 * Navigates user to the previous screen.
 * @returns {object} Action
 */
function createGoBackAction() {
    return goBack();
}

/**
 * Navigates user to the Start screen.
 * @returns {object} Action
 */
function createGoToStartScreenAction() {
    return replace({pathname: '/'});
}

/**
 * Navigates user to the Setup screen.
 * @returns {object} Action
 */
function createGoToSetupScreenAction() {
    return replace({pathname: '/setup/'});
}

/**
 * Navigates user to the Project screen.
 * @returns {object} Action
 */
function createGoToProjectScreenAction() {
    return replace({pathname: '/project/'});
}


module.exports = {
    createGoBackAction,
    createGoToStartScreenAction,
    createGoToSetupScreenAction,
    createGoToProjectScreenAction,
};
