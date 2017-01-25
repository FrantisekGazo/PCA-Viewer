"use strict";

const React = require('react');
const { Card, CardHeader, CardMedia, CardText } = require('material-ui/Card');
const LinearProgress = require('material-ui/LinearProgress').default;

const EigenvaluesSelector = require('./EigenvaluesSelector.jsx');
const EigenvaluesPlot = require('./EigenvaluesPlot.jsx');
const ScatterPlot = require('./ScatterPlot.jsx');


class ProjectResults extends React.Component {

    render() {
        const { pca } = this.props;

        if (pca.loading) {
            return (
                <Card>
                    <LinearProgress mode="indeterminate"/>
                </Card>
            );
        } else if (pca.loaded) {
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
                            selected={[0, 1]}
                            eigenvalues={pca.eigenvalues}/>
                    </Card>

                    <Card style={{marginTop: '10px', marginBottom: '10px'}}>
                        <CardMedia>
                            <ScatterPlot entries={pca.transformedEntries}/>
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
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.pca.hash !== nextProps.pca.hash;
    }
}

ProjectResults.propTypes = {
    pca: React.PropTypes.object.isRequired
};

module.exports = ProjectResults;
