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
            areaCoefficient: CalculationSelector.getAreaCoefficient(state),
            showAreas: CalculationSelector.areAreasShown(state),
            selectedEntryIds: ProjectSelector.getSelectedEntryIds(state),
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {
            onAreaCoefficientChange: (k) => {
                dispatch(CalculationActionCreator.createSetAreaCoefficientAction(k));
            },
            onEigensChange: (selectedIndexes) => {
                dispatch(CalculationActionCreator.createSetEigensAction(selectedIndexes));
            },
            onEntrySelected: (entryIds) => {
                dispatch(ProjectActionCreator.createSelectEntryAction(entryIds));
            },
            onShowAreasChange: (show) => {
                dispatch(CalculationActionCreator.createShowAreasAction(show));
            }
        };
    }
)(ProjectResults);
