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
 * Navigates user to the Project screen for Offline PCA.
 * @returns {object} Action
 */
function createGoToProjectScreenOfflineAction() {
    return replace({pathname: '/project/offline1/'});
}

/**
 * Navigates user to the Project screen for Offline PCA with constant dimension.
 * @returns {object} Action
 */
function createGoToProjectScreenOfflineConstantAction() {
    return replace({pathname: '/project/offline2/'});
}

/**
 * Navigates user to the Project screen for Online PCA.
 * @returns {object} Action
 */
function createGoToProjectScreenOnlineAction() {
    return replace({pathname: '/project/online/'});
}


module.exports = {
    createGoBackAction,
    createGoToStartScreenAction,
    createGoToSetupScreenAction,
    createGoToProjectScreenOfflineAction,
    createGoToProjectScreenOfflineConstantAction,
    createGoToProjectScreenOnlineAction,
};
