"use strict";

const React = require('react');
const {connect} = require('react-redux');

const { PROJECT_TYPE } = require('../../../store/Constants');
const EntrySelection = require('../../components/Project/EntrySelection/EntrySelection.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            selectedEntries: ProjectSelector.getSelectedEntries(state),
            deletable: ProjectSelector.getType(state) === PROJECT_TYPE.OFFLINE_PCA,
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onClearClick: () => {
                dispatch(ProjectAction.createSelectEntryAction(null));
            },
            onDeleteClick: (entryIds) => {
                dispatch(ProjectAction.createDeleteEntriesAction(entryIds));
            }
        };
    }
)(EntrySelection);
