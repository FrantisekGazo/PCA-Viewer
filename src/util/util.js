"use strict";


function range(start, count) {
    return Array.apply(0, Array(count))
        .map(function (element, index) {
            return index + start;
        });
}

const isEmpty = (obj) => Object.keys(obj).length === 0;


module.exports = {
    range,
    isEmpty
};