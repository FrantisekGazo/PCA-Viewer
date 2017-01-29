"use strict";

const React = require('react');
const {Card, CardHeader, CardMedia, CardText} = require('material-ui/Card');
const LinearProgress = require('material-ui/LinearProgress').default;

const PcaService = require('../../../service/PcaService');
const EigenvaluesSelector = require('./EigenvaluesSelector.jsx');
const { EigenvaluesPlot, ScatterPlot } = require('../Plot/index');


class ProjectResults extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            loaded: false,
            pca: null,
            usedEigenpairs: [0, 1]
        };
    }

    componentDidMount() {
        this.recalculatePCA();
    }

    handleEigenPairsChange(newIndexes) {
        this.setState({
            usedEigenpairs: newIndexes
        });
    }

    render() {
        console.log('render');
        const {loading, loaded, error, pca, usedEigenpairs} = this.state;

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
                                    data={pca.data}
                                    usedColumns={usedEigenpairs}/>
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

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps.resultsVersion);
        return this.props.resultsVersion !== nextProps.resultsVersion
            || this.state.usedEigenpairs !== nextState.usedEigenpairs
            || this.state.loading !== nextState.loading
            || this.state.loaded !== nextState.loaded;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate', nextProps.resultsVersion);

        if (nextProps.resultsVersion !== this.props.resultsVersion) {
            console.log('recalculate results');

            nextState.loading = true;
            nextState.loaded = false;

            this.recalculatePCA();
        }
    }

    recalculatePCA() {
        PcaService.calculatePCA(this.props.datasets, this.props.entries)
            .then((pca) => {
                console.log('PCA calculation complete', pca);

                this.setState({
                    pca: pca,
                    loading: false,
                    loaded: true,
                });
            })
            .catch((error) => {
                console.error(error);

                this.setState({
                    pca: null,
                    loading: false,
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
};

module.exports = ProjectResults;
