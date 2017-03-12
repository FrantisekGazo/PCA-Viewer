"use strict";

const React = require('react');
const { connect } = require('react-redux');

const CalculationActionCreator = require('../../../action/CalculationActionCreator');
const CalculationSelector = require('../../../store/selector/CalculationSelector');
const ProjectActionCreator = require('../../../action/ProjectActionCreator');
const ProjectResults = require('../../components/Project/Results/ProjectResults.jsx');
const ProjectSelector = require('../../../store/selector/ProjectSelector');


module.exports = connect(
    // state to props
    (state) => {
        return {
            loading: CalculationSelector.isLoading(state),
            loaded: CalculationSelector.isLoaded(state),
            error: CalculationSelector.getError(state),
            pca: CalculationSelector.getPca(state),
            eigens: CalculationSelector.getEigens(state),
            results: CalculationSelector.getResults(state),
            selectedEntryIds: ProjectSelector.getSelectedEntryIds(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onEntrySelected: (entryIds) => {
                dispatch(ProjectActionCreator.createSelectEntryAction(entryIds));
            },
            onEigensChange: (selectedIndexes) => {
                dispatch(CalculationActionCreator.createSetEigensAction(selectedIndexes));
            }
        };
    }
)(ProjectResults);
