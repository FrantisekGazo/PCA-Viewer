"use strict";

const React = require('react');
const { Card, CardHeader, CardText } = require('material-ui/Card');


class StreamEditor extends React.Component {

    render() {
        const firstValues = this.props.stream.slice(0, 100)
            .map(v => v.toString()).join(' ');

        return (
            <Card>
                <CardHeader title='Stream'/>
                <CardText>
                    { firstValues }...
                </CardText>
            </Card>
        );
    }
}

StreamEditor.propTypes = {
    stream: React.PropTypes.array.isRequired,
};

module.exports = StreamEditor;
