"use strict";


const DEFAULT_SAMPLING = 100;

const PROJECT_TYPE = {
    OFFLINE_PCA: 1,
    ONLINE_PCA: 2,
};

const TRANSFORMATIONS = {
    NONE: 1,
    DIFF: 2,
    COUNT: 3
};


module.exports = {
    DEFAULT_SAMPLING,
    PROJECT_TYPE,
    TRANSFORMATIONS,
};
