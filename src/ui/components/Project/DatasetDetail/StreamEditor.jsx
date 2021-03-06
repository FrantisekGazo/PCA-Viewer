"use strict";

const React = require('react');
const { Card, CardHeader, CardMedia, CardText } = require('material-ui/Card');
const Divider = require('material-ui/Divider').default;

const StreamPlot = require('./StreamPlotHighcharts.jsx');
const StreamTransformationSelector = require('./StreamTransformationSelector.jsx');


/**
 * React component that shows a stream chart and a transformation selector.
 */
class StreamEditor extends React.Component {

    /**
     * Helper function for showing only several first values.
     * @param s {Array} Array of values.
     */
    firstValues(s) {
        return s.slice(0, 10).map(v => v.toString()).join(', ');
    }

    render() {
        const {
            dataset,
            stream, transformedStream,
            selectedEntries,
            transformation, onTransformationChange,
        } = this.props;

        const highlightedAreas = selectedEntries.map(e => {
            return {
                from: e.streamIndex,
                to: e.streamIndex + e.value.length
            };
        });

        return (
            <Card>
                <CardHeader title='Stream'/>

                <CardMedia>
                    <StreamPlot
                        color={dataset.color}
                        stream={transformedStream}
                        highlighted={highlightedAreas}/>
                </CardMedia>

                <CardText>
                    Stream: { this.firstValues(stream) }... ({stream.length} values)
                </CardText>

                <Divider/>

                <CardMedia>
                    <StreamTransformationSelector
                        transformation={transformation}
                        onChange={onTransformationChange}/>
                </CardMedia>

                <Divider/>

                <CardText>
                    Transformed Stream: { this.firstValues(transformedStream) }... ({transformedStream.length} values)
                </CardText>
            </Card>
        );
    }
}

StreamEditor.propTypes = {
    /* dataset to which this stream belongs */
    dataset: React.PropTypes.object.isRequired,
    /* original stream of values */
    stream: React.PropTypes.array.isRequired,
    /* transformed stream of values */
    transformedStream: React.PropTypes.array.isRequired,
    /* transformation applied to the original stream */
    transformation: React.PropTypes.object.isRequired,
    /* selected entries */
    selectedEntries: React.PropTypes.array.isRequired,
    /* callback */
    onTransformationChange: React.PropTypes.func.isRequired,
};

module.exports = StreamEditor;
