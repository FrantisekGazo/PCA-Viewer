"use strict";


/**
 * Provides general functions for creating actions.
 */
class BaseActionCreator {

    constructor(actions = {}) {
        this.ACTIONS = actions;
    }

    /**
     * Creates an action.
     * This method defines how all actions should look like.
     *
     * @param type Action type
     * @param payload Action data
     * @returns {{type: string, payload: *}}
     */
    createAction(type, payload = null) {
        return {type, payload};
    }
}


module.exports = BaseActionCreator;
