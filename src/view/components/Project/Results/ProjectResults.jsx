"use strict";

const React = require('react');
const {Card, CardHeader, CardMedia, CardText} = require('material-ui/Card');
const LinearProgress = require('material-ui/LinearProgress').default;

const EigenvaluesSelector = require('./EigenvaluesSelector.jsx');
const EigenvaluesPlot = require('./EigenvaluesPlot.jsx');
const ScatterPlot = require('./ScatterPlot.jsx');


class ProjectResults extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            usedEigenpairs: [0, 1],
        };
    }

    handleEigenPairsChange(newIndexes) {
        this.setState({
            usedEigenpairs: newIndexes
        });
    }

    render() {
        const { usedEigenpairs } = this.state;
        const { loading, loaded, error, pca, resultsVersion, selectedEntryIds, onEntrySelected } = this.props;

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
                                selected={usedEigenpairs}
                                onSelectionChange={this.handleEigenPairsChange.bind(this)}/>
                        </Card>

                        <Card style={{marginTop: '10px', marginBottom: '10px'}}>
                            <CardMedia>
                                <ScatterPlot
                                    selectedEntryIds={selectedEntryIds}
                                    selectedColor={'#ff0000'}
                                    data={pca.data}
                                    dataVersion={resultsVersion}
                                    usedColumns={usedEigenpairs}
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
    /* results */
    loading: React.PropTypes.bool.isRequired,
    loaded: React.PropTypes.bool.isRequired,
    error: React.PropTypes.string.isRequired,
    pca: React.PropTypes.object, // can be null
    resultsVersion: React.PropTypes.number.isRequired,
    // selected entry IDs
    selectedEntryIds: React.PropTypes.array.isRequired,
    // callback
    onEntrySelected: React.PropTypes.func.isRequired,
};

module.exports = ProjectResults;
