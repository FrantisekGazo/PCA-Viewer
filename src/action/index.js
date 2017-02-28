"use strict";


/**
 * Creates an action.
 * This method defines how all actions should look like.
 *
 * @param type Action type
 * @param payload Action data
 * @returns {{type: string, payload: *}}
 */
function createAction(type, payload=null) {
    return {type, payload}
}

module.exports = createAction;
