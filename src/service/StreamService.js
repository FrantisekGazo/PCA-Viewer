"use strict";

const { TRANSFORMATIONS } = require('../reducer/project');


/**
 * Transforms given stream based on given transformation.
 * @returns {Promise}
 */
function transformStream(stream, transformation) {
    return new Promise(function (resolve, reject) {
        if (transformation.type === TRANSFORMATIONS.NONE) {
            resolve(copy(stream));
        } else if (transformation.type === TRANSFORMATIONS.DIFF) {
            // FIXME : implement DIFF transformation
            resolve([1, 2, 3, 1]);
        } else if (transformation.type === TRANSFORMATIONS.COUNT) {
            const value = transformation.value;
            if (transformation.value > 0) {
                // FIXME : implement COUNT transformation
                resolve([43, 78, 8, 61]);
            } else {
                reject(Error('Invalid value of stream transformation ' + transformation.type));
            }
        } else {
            reject(Error('Unknown stream transformation ' + transformation.type));
        }
    });
}

const copy = (stream) => stream.slice();


module.exports = {
    transformStream,
};
