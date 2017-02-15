"use strict";

const React = require('react');
const { List, ListItem } = require('material-ui/List');
const { Card, CardActions } = require('material-ui/Card');
const Subheader = require('material-ui/Subheader').default;
const FloatingActionButton = require('material-ui/FloatingActionButton').default;
const ContentAdd = require('material-ui/svg-icons/content/add').default;

const DatasetListItem = require('./DatasetListItem.jsx');


const datasetsToList = (datasets, onDatasetClicked) => {
    let list = datasets.map(dataset => {
        return (<DatasetListItem key={dataset.id}
                                 dataset={dataset}
                                 onClick={() => onDatasetClicked(dataset.id)}/>)
    });
    if (list.length === 0) {
        list = (<ListItem key="0">None</ListItem>);
    }
    return list;
};

const DatasetList = ({datasets, includedDatasetIds, onDatasetClicked, onAddDatasetClicked}) => {
    const includedList = datasetsToList(datasets.filter(d => includedDatasetIds.indexOf(d.id) >= 0), onDatasetClicked);
    const excludedList = datasetsToList(datasets.filter(d => includedDatasetIds.indexOf(d.id) === -1), onDatasetClicked);

    return (
        <Card id="dataset-list">
            <List>
                <Subheader>Datasets:</Subheader>
                { includedList }
            </List>
            <List>
                <Subheader>Excuded:</Subheader>
                { excludedList }
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
    datasets: React.PropTypes.array.isRequired,
    includedDatasetIds: React.PropTypes.array.isRequired,
    onDatasetClicked: React.PropTypes.func.isRequired,
    onAddDatasetClicked: React.PropTypes.func.isRequired
};

module.exports = DatasetList;
