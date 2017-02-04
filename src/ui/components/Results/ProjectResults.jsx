"use strict";

const React = require('react');
const {Card, CardHeader, CardMedia, CardText} = require('material-ui/Card');
const LinearProgress = require('material-ui/LinearProgress').default;

const PcaService = require('../../../service/PcaService');
const EigenvaluesSelector = require('./EigenvaluesSelector.jsx');
const EigenvaluesPlot = require('./EigenvaluesPlot.jsx');
const ScatterPlot = require('./ScatterPlot.jsx');


class ProjectResults extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            loaded: false,
            pca: null,
            usedEigenpairs: [0, 1],
            error: null
        };
    }

    componentDidMount() {
        this.recalculatePCA(this.props);
    }

    handleEigenPairsChange(newIndexes) {
        this.setState({
            usedEigenpairs: newIndexes
        });
    }

    render() {
        const { loading, loaded, error, pca, usedEigenpairs } = this.state;
        const { resultsVersion, selectedEntryIds, onEntrySelected } = this.props;

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

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.resultsVersion !== this.props.resultsVersion) {
            nextState.loading = true;
            nextState.loaded = false;

            this.recalculatePCA(nextProps);
        }
    }

    recalculatePCA(props) {
        PcaService.calculatePCA(props.datasets, props.entries)
            .then((pca) => {
                this.setState({
                    loading: false,
                    loaded: true,
                    pca: pca,
                    error: null
                });
            })
            .catch((error) => {
                console.error(error);

                this.setState({
                    loading: false,
                    loaded: false,
                    pca: null,
                    error: error.message,
                });
            });
    }
}

ProjectResults.propTypes = {
    // number that should be incremented each time result needs an update
    resultsVersion: React.PropTypes.number.isRequired,
    // array of all datasets
    datasets: React.PropTypes.array.isRequired,
    // map of all entries
    entries: React.PropTypes.object.isRequired,
    // selected entry IDs
    selectedEntryIds: React.PropTypes.array.isRequired,
    // callback
    onEntrySelected: React.PropTypes.func.isRequired,
};

module.exports = ProjectResults;
