"use strict";


const isPcaLoaded = (state, props) => state.project.pca.loaded;

const getCumulativeVariance = (state, props) => state.project.pca.cumulativeVariance;

const getEigenvalues = (state, props) => state.project.pca.eigenvalues;

const getEigenvectors = (state, props) => state.project.pca.eigenvectors;

const getTransformedEntries = (state, props) => state.project.pca.transformedEntries;

module.exports = {
    isPcaLoaded,
    getCumulativeVariance,
    getEigenvalues,
    getEigenvectors,
    getTransformedEntries,
};
