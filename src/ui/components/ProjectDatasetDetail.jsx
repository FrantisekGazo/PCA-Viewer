"use strict";

const React = require('react');

const ProjectDatasetDetail = ({dataset, onAddDataClicked, onDeleteClicked, onCloseClicked}) => {
    return (
        <div id="dataset-detail">
            Name: {dataset.name}
            <br/>
            ID: {dataset.id}
            <br/>
            <br/>
            <button onClick={() => onAddDataClicked(dataset.id)}>Add Data</button>
            <br/>
            <button onClick={() => onDeleteClicked(dataset.id)}>Delete</button>
            <button onClick={() => onCloseClicked(dataset.id)}>Close</button>
        </div>
    );
};

ProjectDatasetDetail.propTypes = {
    dataset: React.PropTypes.object.isRequired,
    onAddDataClicked: React.PropTypes.func.isRequired,
    onDeleteClicked: React.PropTypes.func.isRequired,
    onCloseClicked: React.PropTypes.func.isRequired
};

module.exports = ProjectDatasetDetail;
