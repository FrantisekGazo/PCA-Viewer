"use strict";


const copyArray = (a) => a.slice();

const isEmpty = (obj) => Object.keys(obj).length === 0;

function range(start, count) {
    return Array.apply(0, Array(count))
        .map(function (element, index) {
            return index + start;
        });
}

function sortNumArrayDesc(a) {
    const sortNumber = (a, b) => a - b;
    return a.sort(sortNumber).reverse(sortNumber);
}


module.exports = {
    copyArray,
    isEmpty,
    range,
    sortNumArrayDesc,
};