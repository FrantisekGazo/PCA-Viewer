"use strict";

const React = require('react');
const {connect} = require('react-redux');

const EntrySelection = require('../../components/Project/EntrySelection/EntrySelection.jsx');
const { clearSelectedEntries } = require('../../../actions/ProjectAction');
const ProjectSelector = require('../../../selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            selectedEntryIds: ProjectSelector.getDetailEntryIds(state),
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
