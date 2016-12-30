"use strict";

const React = require('react');

const ProjectDatasetListItem = require('./ProjectDatasetListItem.jsx');


const ProjectDatasetList = ({datasets, onDatasetClicked, onAddDatasetClicked}) => {
    const list = datasets.map(dataset => (<ProjectDatasetListItem key={dataset.id}
                                                                  dataset={dataset}
                                                                  onClick={() => onDatasetClicked(dataset.id)}/>));

    return (
        <div id="dataset-list">
            Datasets:
            <ul>{list}</ul>
            <button onClick={onAddDatasetClicked}>Add Dataset</button>
        </div>
    );
};

ProjectDatasetList.propTypes = {
    datasets: React.PropTypes.array,
    onDatasetClicked: React.PropTypes.func.isRequired,
    onAddDatasetClicked: React.PropTypes.func.isRequired
};

module.exports = ProjectDatasetList;
