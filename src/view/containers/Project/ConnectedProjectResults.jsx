"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectResults = require('../../components/Project/Results/ProjectResults.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const ProjectSelector = require('../../../store/selector/ProjectSelector');
const CalculationSelector = require('../../../store/selector/CalculationSelector');


// FIXME: refactor this component to use the results from the store
module.exports = connect(
    // state to props
    (state) => {
        return {
            resultsVersion: CalculationSelector.getVersion(state),
            selectedEntryIds: ProjectSelector.getDetailEntryIds(state),
            datasetsWithEntries: ProjectSelector.getIncludedDatasetsWithEntries(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onEntrySelected: (entryIds) => {
                dispatch(ProjectAction.createSelectEntryAction(entryIds));
            }
        };
    }
)(ProjectResults);
