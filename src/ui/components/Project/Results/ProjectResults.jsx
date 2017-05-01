"use strict";

const React = require('react');
const {Card, CardMedia, CardText} = require('material-ui/Card');
const LinearProgress = require('material-ui/LinearProgress').default;

const AreaEditor = require('./AreaEditor.jsx');
const EigenvaluesSelector = require('./EigenvaluesSelector.jsx');
const EigenvaluesPlot = require('./EigenvaluesPlot.jsx');
const ScatterPlot = require('./ScatterPlot.jsx');


/**
 * React component that shows calculated results.
 */
class ProjectResults extends React.Component {

    render() {
        const {
            loading, loaded, error, pca, eigens, results, selectedEntryIds,
            areaCoefficient, showAreas,
            onEntrySelected, onEigensChange, onAreaCoefficientChange, onShowAreasChange
        } = this.props;

        if (loading) {
            return (
                <Card>
                    <LinearProgress mode="indeterminate"/>
                </Card>
            );
        } else if (loaded) {
            if (pca) {
                return (
                    <div>
                        <Card>
                            <CardMedia>
                                <EigenvaluesPlot
                                    eigenvalues={pca.eigenvalues}
                                    cumulativeVariance={pca.cumulativeVariance}/>
                            </CardMedia>
                        </Card>

                        <Card style={{marginTop: '10px'}}>
                            <EigenvaluesSelector
                                eigenvalues={pca.eigenvalues}
                                selected={eigens}
                                onSelectionChange={onEigensChange}/>
                        </Card>

                        <Card style={{marginTop: '10px', marginBottom: '10px'}}>
                            <CardMedia>
                                <AreaEditor
                                    coefficient={areaCoefficient}
                                    shown={showAreas}
                                    onShownChange={onShowAreasChange}
                                    onCoefficientChange={onAreaCoefficientChange}/>
                            </CardMedia>
                        </Card>

                        <Card style={{marginTop: '10px', marginBottom: '10px'}}>
                            <CardMedia>
                                <ScatterPlot
                                    selectedEntryIds={selectedEntryIds}
                                    selectedColor={'#ff0000'}
                                    results={results}
                                    axisTitles={eigens.map(i => `u${i+1}`)}
                                    showAreas={showAreas}
                                    onPlotClick={onEntrySelected}/>
                            </CardMedia>
                        </Card>
                    </div>
                );
            } else {
                return (
                    <Card>
                        <CardText>
                            You must add a dataset with some entries if you want to see some results...
                        </CardText>
                    </Card>
                );
            }
        } else if (error) {
            return (
                <Card>
                    <CardText>
                        { error }
                    </CardText>
                </Card>
            );
        } else {
            return null;
        }
    }
}

ProjectResults.propTypes = {
    loading: React.PropTypes.bool.isRequired,
    loaded: React.PropTypes.bool.isRequired,
    error: React.PropTypes.string.isRequired,
    /* results */
    pca: React.PropTypes.object, // can be null
    eigens: React.PropTypes.array.isRequired,
    results: React.PropTypes.object.isRequired,
    areaCoefficient: React.PropTypes.number.isRequired,
    showAreas: React.PropTypes.bool.isRequired,
    // selected entry IDs
    selectedEntryIds: React.PropTypes.array.isRequired,
    // callbacks
    onEntrySelected: React.PropTypes.func.isRequired,
    onEigensChange: React.PropTypes.func.isRequired,
    onShowAreasChange: React.PropTypes.func.isRequired,
    onAreaCoefficientChange: React.PropTypes.func.isRequired,
};

module.exports = ProjectResults;
