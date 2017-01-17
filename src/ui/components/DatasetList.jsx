"use strict";

const React = require('react');
const { List } = require('material-ui/List');
const { Card, CardActions } = require('material-ui/Card');
const Subheader = require('material-ui/Subheader').default;
const FloatingActionButton = require('material-ui/FloatingActionButton').default;
const ContentAdd = require('material-ui/svg-icons/content/add').default;

const DatasetListItem = require('./DatasetListItem.jsx');


const DatasetList = ({datasets, onDatasetClicked, onAddDatasetClicked}) => {
    const list = datasets.map(dataset => (<DatasetListItem key={dataset.id}
                                                           dataset={dataset}
                                                           onClick={() => onDatasetClicked(dataset.id)}/>));

    return (
        <Card id="dataset-list">
            <List>
                <Subheader>Datasets:</Subheader>
                {list}
            </List>
            <CardActions>
                <FloatingActionButton label="Add" mini={true} onTouchTap={onAddDatasetClicked}>
                    <ContentAdd />
                </FloatingActionButton>
            </CardActions>
        </Card>
    );
};

DatasetList.propTypes = {
    datasets: React.PropTypes.array,
    onDatasetClicked: React.PropTypes.func.isRequired,
    onAddDatasetClicked: React.PropTypes.func.isRequired
};

module.exports = DatasetList;
