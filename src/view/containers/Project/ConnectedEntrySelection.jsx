"use strict";

const React = require('react');
const {connect} = require('react-redux');

const EntrySelection = require('../../components/Project/EntrySelection/EntrySelection.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            selectedEntries: ProjectSelector.getSelectedEntries(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onClearClicked: () => {
                dispatch(ProjectAction.createSelectEntryAction(null));
            }
        };
    }
)(EntrySelection);
