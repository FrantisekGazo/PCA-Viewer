"use strict";

const React = require('react');
const {connect} = require('react-redux');
const PCA = require('ml-pca');

const ProjectContent = require('../components/ProjectContent.jsx');


module.exports = connect(
    // state to props
    (state) => {
        const datasets = state.project.usedDatasetIds.map(datasetId => state.project.datasets[datasetId]);

        const values = [];
        for (let i = 0; i < datasets.length; i++) {
            const dataset = datasets[i];
            for (let j = 0; j < dataset.entries.length; j++) {
                const entryId = dataset.entries[j];
                const entry = state.project.entries[entryId];
                values.push(entry.value);
            }
        }

        let model = "";

        if (values.length > 0) {
            const pca = new PCA(values, {
                scale: true
            });

            model = JSON.stringify(pca.toJSON());
            console.log(model);
        }

        return {
            pca: model
        };
    },
    // dispatch functions to props
    (dispatch) => {
        return {};
    }
)(ProjectContent);
