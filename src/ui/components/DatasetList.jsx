"use strict";

const React = require('react');

const DatasetListItem = require('./DatasetListItem.jsx');


const DatasetList = ({datasets, onDatasetClicked, onAddDatasetClicked}) => {
    const list = datasets.map(dataset => (<DatasetListItem key={dataset.id}
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

DatasetList.propTypes = {
    datasets: React.PropTypes.array,
    onDatasetClicked: React.PropTypes.func.isRequired,
    onAddDatasetClicked: React.PropTypes.func.isRequired
};

module.exports = DatasetList;
