"use strict";

const React = require('react');
const { Card } = require('material-ui/Card');

const StreamSamplingSelector = require('./StreamSamplingSelector');


class ProjectResults extends React.Component {

    render() {
        const { sampling, onSamplingChange } = this.props;

        return (
            <Card>
                <StreamSamplingSelector
                    sampling={sampling}
                    onChange={onSamplingChange}/>
            </Card>
        );
    }
}

ProjectResults.propTypes = {
    sampling: React.PropTypes.number.isRequired,
    onSamplingChange: React.PropTypes.func.isRequired,
};

module.exports = ProjectResults;
