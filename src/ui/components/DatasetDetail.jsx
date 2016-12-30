"use strict";

const React = require('react');

const DataList = require('./DataList.jsx');

const DatasetDetail = ({dataset, onAddDataClicked, onDeleteClicked, onCloseClicked, onDataClicked}) => {
    return (
        <div id="dataset-detail">
            Name: {dataset.name}
            <br/>
            ID: {dataset.id}
            <br/>
            <DataList data={[{id: 1, name: 'data 1'},{id: 2, name: 'data 2'},{id: 3, name: 'data 3'},{id: 4, name: 'data 4'},{id: 5, name: 'data 5'}]}
                      onDataClick={(dataId) => {
                          onDataClicked(dataset.id, dataId)
                      }}
                      onAddDataClick={() => onAddDataClicked(dataset.id)}/>
            <br/>
            <button onClick={() => onDeleteClicked(dataset.id)}>Delete</button>
            <button onClick={() => onCloseClicked(dataset.id)}>Close</button>
        </div>
    );
};

DatasetDetail.propTypes = {
    dataset: React.PropTypes.object.isRequired,
    onAddDataClicked: React.PropTypes.func.isRequired,
    onDeleteClicked: React.PropTypes.func.isRequired,
    onCloseClicked: React.PropTypes.func.isRequired,
    onDataClicked: React.PropTypes.func.isRequired
};

module.exports = DatasetDetail;
