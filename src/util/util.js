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

function sortNumArrayAsc(a) {
    const sortNumber = (a, b) => a - b;
    return a.sort(sortNumber);
}

function equalArrays(arr1, arr2) {
    if (arr1 === arr2) {
        return true;
    }
    if (!arr1 || !arr2) {
        return false;
    }
    if (arr1.length !== arr2.length) {
        return false;
    }

    const sortedArr1 = sortNumArrayAsc(arr1);
    const sortedArr2 = sortNumArrayAsc(arr2);

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}


module.exports = {
    copyArray,
    isEmpty,
    range,
    sortNumArrayAsc,
    sortNumArrayDesc,
    equalArrays
};