"use strict";

const React = require('react');
const {connect} = require('react-redux');

const { PROJECT_TYPE } = require('../../../store/Constants');
const EntrySelection = require('../../components/Project/EntrySelection/EntrySelection.jsx');
const ProjectActionCreator = require('../../../action/ProjectActionCreator');
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
                dispatch(ProjectActionCreator.createSelectEntryAction(null));
            },
            onDeleteClick: (entryIds) => {
                dispatch(ProjectActionCreator.createDeleteEntriesAction(entryIds));
            }
        };
    }
)(EntrySelection);
