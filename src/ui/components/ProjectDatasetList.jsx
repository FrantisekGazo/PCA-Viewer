"use strict";

const React = require('react');


const ProjectDatasetList = ({datasets, onAddDataClicked}) => {
    const list = null;

    return (
        <div>
            <h2>Data</h2>
            <ul>{list}</ul>
            <button onClick={onAddDataClicked}>Add data</button>
        </div>
    )
};

ProjectDatasetList.propTypes = {
    datasets: React.PropTypes.array,
    onAddDataClicked: React.PropTypes.func.isRequired
};

module.exports = ProjectDatasetList;
