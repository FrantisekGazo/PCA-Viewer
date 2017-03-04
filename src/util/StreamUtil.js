"use strict";

const { copyArray } = require('./index');
const { TRANSFORMATIONS, ADDITIONAL_SAMPLES_COUNT } = require('../store/Constants');
const ProjectReducer = require('../store/reducer/ProjectReducer');
const Entry = require('../store/model/Entry');


/**
 * Provides methods for stream manipulation.
 */
class StreamUtil {

    /**
     * Samples given stream based on given sampling window.
     * @param stream {Array} A stream
     * @param samplingWindow {Object} A sampling window
     * @param limitCount {boolean} <code>true<code> if the count of sampled values should be limited by sampling window count.
     * @returns {Promise}
     */
    static sampleStreamValues(stream, samplingWindow, limitCount) {
        return new Promise(function (resolve, reject) {
            const start = samplingWindow.start;
            const sampling = samplingWindow.size;
            const overlay = samplingWindow.overlay;
            const maxCount = samplingWindow.fixedCount + ADDITIONAL_SAMPLES_COUNT;

            let result = [];

            let sample;
            for (let i = start; i <= stream.length - sampling; i += sampling - overlay) {
                if (limitCount && result.length >= maxCount) {
                    break; // do not sample more than necessary
                }

                sample = stream.slice(i, i + sampling);
                result.push(sample);
            }

            if (result.length > 0) {
                resolve(result);
            } else {
                reject(Error(`Sampling ${sampling} failed`));
            }
        });
    }

    /**
     * Samples given stream based on given sampling count.
     * @param datasetId {number} A dataset ID
     * @param entries {Object} An entries map to which the newly sampled entries will be added
     * @param entryId {number} A first usable entry ID value
     * @param stream {Array} A stream
     * @param samplingWindow {Object} A sampling window
     * @param limitCount {boolean} <code>true<code> if the count of sampled values should be limited by sampling window count.
     * @returns {Promise}
     */
    static sampleStreamEntries(datasetId, entries, entryId, stream, samplingWindow, limitCount) {
        return StreamUtil.sampleStreamValues(stream, samplingWindow, limitCount)
            .then((values) => {
                let entry;
                let index = samplingWindow.start;
                for (let i = 0; i < values.length; i++) {
                    entry = new Entry({
                        id: entryId++,
                        datasetId: datasetId,
                        value: values[i],
                        streamIndex: index,
                    });
                    entries[entry.getId()] = entry;
                    index += samplingWindow.size;
                }
                return entryId;
            });
    }

    /**
     * Transforms given stream based on given transformation.
     * @returns {Promise}
     */
    static transformStream(stream, transformation) {
        return new Promise(function (resolve, reject) {
            if (transformation.type === TRANSFORMATIONS.NONE) {
                resolve(copyArray(stream));
            } else if (transformation.type === TRANSFORMATIONS.DIFF) {
                resolve(StreamUtil.diff(stream));
            } else if (transformation.type === TRANSFORMATIONS.COUNT) {
                const value = transformation.value;
                if (transformation.value > 0) {
                    resolve(StreamUtil.count(stream, value));
                } else {
                    reject(Error('Invalid value of stream transformation ' + transformation.type));
                }
            } else {
                reject(Error('Unknown stream transformation ' + transformation.type));
            }
        });
    }

    /**
     * Calculates new stream which values will be differences between the original values.
     * @param stream
     * @returns {Array}
     */
    static diff(stream) {
        let resultStream = [];

        let lastValue = 0;
        let currentValue;

        for (let i = 0; i < stream.length; i++) {
            currentValue = stream[i];
            resultStream.push(currentValue - lastValue);
            lastValue = currentValue;
        }

        return resultStream;
    }

    /**
     * Calculates new stream which values will be counts of the original values in the given interval.
     * @param stream
     * @param interval
     * @returns {Array}
     */
    static count(stream, interval) {
        let resultStream = [];

        let intervalStart = undefined;
        let intervalCount = undefined;
        let currentValue;

        for (let i = 0; i < stream.length; i++) {
            currentValue = stream[i];

            if (intervalStart === undefined) {
                intervalStart = currentValue;
                intervalCount = 1;
            } else if ((currentValue - intervalStart) < interval) {
                intervalCount += 1;
            } else {
                resultStream.push(intervalCount);

                intervalStart = currentValue;
                intervalCount = 1;
            }
        }

        return resultStream;
    }
}


module.exports = StreamUtil;
