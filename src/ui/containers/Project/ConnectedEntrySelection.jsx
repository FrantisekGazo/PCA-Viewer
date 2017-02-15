"use strict";

const React = require('react');
const {connect} = require('react-redux');

const EntrySelection = require('../../components/Project/EntrySelection/EntrySelection.jsx');
const { clearSelectedEntries } = require('../../../actions/project');
const selector = require('../../../selector/dataset');


module.exports = connect(
    // state to props
    (state) => {
        return {
            selectedEntryIds: selector.getDetailEntryIds(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onClearClicked: () => {
                dispatch(clearSelectedEntries());
            }
        };
    }
)(EntrySelection);
