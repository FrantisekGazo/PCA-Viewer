"use strict";

const React = require('react');
const { Card, CardHeader, CardMedia, CardText } = require('material-ui/Card');
const Divider = require('material-ui/Divider').default;

const StreamPlot = require('./StreamPlotHighcharts.jsx');
const StreamTransformationSelector = require('./StreamTransformationSelector.jsx');


/**
 * Helper function for showing only several first values.
 * @param s {Array} Array of values.
 */
const firstValues = (s) => s.slice(0, 10).map(v => v.toString()).join(', ');


/**
 * Shows a graph of the stream and selector for transformations.
 */
class StreamEditor extends React.Component {

    render() {
        const {
            stream, transformedStream,
            transformation, onTransformationChange,
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
            </Card>
        );
    }
}

StreamEditor.propTypes = {
    /* original stream of values */
    stream: React.PropTypes.array.isRequired,
    /* transformed stream of values */
    transformedStream: React.PropTypes.array.isRequired,
    /* transformation applied to the original stream */
    transformation: React.PropTypes.object.isRequired,
    /* callback */
    onTransformationChange: React.PropTypes.func.isRequired,
};

module.exports = StreamEditor;
