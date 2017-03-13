"use strict";

const BaseActionCreator = require('./BaseActionCreator');
const { replace, push, goBack } = require('react-router-redux');


/**
 * Creates router actions.
 */
class RouterActionCreator extends BaseActionCreator {

    /**
     * Navigates user to the previous screen.
     * @returns {object} Action
     */
    createGoBackAction() {
        return goBack();
    }

    /**
     * Navigates user to the Start screen.
     * @returns {object} Action
     */
    createGoToStartScreenAction() {
        return replace({pathname: '/'});
    }

    /**
     * Navigates user to the Setup screen.
     * @returns {object} Action
     */
    createGoToSetupScreenAction() {
        return replace({pathname: '/setup/'});
    }

    /**
     * Navigates user to the Project screen. (no project will be shown yet)
     * @returns {object} Action
     */
    createGoToProjectScreenLoadingAction() {
        return replace({pathname: '/project/'});
    }

    /**
     * Navigates user to the Project screen for Offline PCA.
     * @returns {object} Action
     */
    createGoToProjectScreenOfflineAction() {
        return replace({pathname: '/project/offline0/'});
    }

    /**
     * Navigates user to the Project screen for Offline PCA with constant dimension.
     * @returns {object} Action
     */
    createGoToProjectScreenOfflineConstantAction() {
        return replace({pathname: '/project/offline1/'});
    }

    /**
     * Navigates user to the Project screen for Online PCA.
     * @returns {object} Action
     */
    createGoToProjectScreenOnlineAction() {
        return replace({pathname: '/project/online/'});
    }
}


module.exports = new RouterActionCreator();
