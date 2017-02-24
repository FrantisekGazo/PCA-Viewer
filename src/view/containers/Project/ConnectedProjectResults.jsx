"use strict";

const React = require('react');
const { connect } = require('react-redux');

const ProjectResults = require('../../components/Project/Results/ProjectResults.jsx');
const ProjectAction = require('../../../action/ProjectAction');
const ProjectSelector = require('../../../store/selector/ProjectSelector');
const CalculationSelector = require('../../../store/selector/CalculationSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            loading: CalculationSelector.isLoading(state),
            loaded: CalculationSelector.isLoaded(state),
            error: CalculationSelector.getError(state),
            resultsVersion: CalculationSelector.getVersion(state),
            pca: CalculationSelector.getPCA(state),
            selectedEntryIds: ProjectSelector.getDetailEntryIds(state),
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
