"use strict";

const React = require('react');
const { Card, CardHeader, CardMedia, CardText } = require('material-ui/Card');
const Divider = require('material-ui/Divider').default;

const StreamPlot = require('./StreamPlot.jsx');
const StreamTransformationPicker = require('./StreamTransformationPicker.jsx');


class StreamEditor extends React.Component {

    render() {
        const { stream } = this.props;

        const firstValues = stream.slice(0, 100)
            .map(v => v.toString()).join(' ');

        return (
            <Card>
                <CardHeader title='Stream'/>

                <CardMedia>
                    <StreamPlot stream={stream}/>
                </CardMedia>

                <CardText>
                    { firstValues }...
                </CardText>

                <Divider/>

                <CardMedia>
                    <StreamTransformationPicker transformation={{}}/>
                </CardMedia>
            </Card>
        );
    }
}

StreamEditor.propTypes = {
    stream: React.PropTypes.array.isRequired,
};

module.exports = StreamEditor;
