"use strict";

const React = require('react');
const { Card, CardHeader, CardMedia, CardText } = require('material-ui/Card');
const Divider = require('material-ui/Divider').default;

const StreamPlot = require('./StreamPlotHighcharts.jsx');
const StreamTransformationSelector = require('./StreamTransformationSelector.jsx');
const StreamSamplingSelector = require('./StreamSamplingSelector.jsx');


const firstValues = (s) => s.slice(0, 10).map(v => v.toString()).join(', ');

class StreamEditor extends React.Component {

    render() {
        const {
            stream, transformedStream,
            transformation, onTransformationChange,
            sampling, onSamplingChange
        } = this.props;

        return (
            <Card>
                <CardHeader title='Stream'/>

                <CardMedia>
                    <StreamPlot stream={transformedStream}/>
                </CardMedia>

                <CardText>
                    Stream: { firstValues(stream) }... ({stream.length} values)
                </CardText>

                <Divider/>

                <CardMedia>
                    <StreamTransformationSelector
                        transformation={transformation}
                        onChange={onTransformationChange}/>
                </CardMedia>

                <Divider/>

                <CardText>
                    Transformed Stream: { firstValues(transformedStream) }... ({transformedStream.length} values)
                </CardText>

                <Divider/>

                <CardMedia>
                    <StreamSamplingSelector
                        sampling={sampling}
                        onChange={onSamplingChange}/>
                </CardMedia>
            </Card>
        );
    }
}

StreamEditor.propTypes = {
    stream: React.PropTypes.array.isRequired,
    transformedStream: React.PropTypes.array.isRequired,
    transformation: React.PropTypes.object.isRequired,
    onTransformationChange: React.PropTypes.func.isRequired,
    sampling: React.PropTypes.number.isRequired,
    onSamplingChange: React.PropTypes.func.isRequired,
};

module.exports = StreamEditor;
