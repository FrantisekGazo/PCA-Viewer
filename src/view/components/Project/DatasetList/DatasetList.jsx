"use strict";

const React = require('react');
const { List, ListItem } = require('material-ui/List');
const { Card, CardActions } = require('material-ui/Card');
const Subheader = require('material-ui/Subheader').default;
const FloatingActionButton = require('material-ui/FloatingActionButton').default;
const ContentAdd = require('material-ui/svg-icons/content/add').default;

const DatasetListItem = require('./DatasetListItem.jsx');


/**
 * Converts list for datasets to a list component.
 * @param datasets {Array} of datasets
 * @param onDatasetClick {function} callback that will be called if a dataset was clicked.
 * @returns {Object} Component
 */
const datasetsToList = (datasets, onDatasetClick) => {
    if (datasets.length > 0) {
        return datasets.map(dataset => {
            return (
                <DatasetListItem
                    key={dataset.id}
                    dataset={dataset}
                    onClick={() => onDatasetClick(dataset.id)}/>
            )
        });
    } else {
        return (
            <ListItem key="0">None</ListItem>
        );
    }
};

/**
 * Shows list of both included and excluded datasets and the option for adding new component.
 */
const DatasetList = ({datasets, includedDatasetIds, onDatasetClick, onAddDatasetClick}) => {
    const includedList = datasetsToList(datasets.filter(d => includedDatasetIds.indexOf(d.id) >= 0), onDatasetClick);
    const excludedList = datasetsToList(datasets.filter(d => includedDatasetIds.indexOf(d.id) === -1), onDatasetClick);

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
                <FloatingActionButton
                    label="Add"
                    mini={true}
                    onTouchTap={onAddDatasetClick}>
                    <ContentAdd />
                </FloatingActionButton>
            </CardActions>
        </Card>
    );
};

DatasetList.propTypes = {
    /* list of all datasets */
    datasets: React.PropTypes.array.isRequired,
    /* list of dataset IDs that are included in calculations */
    includedDatasetIds: React.PropTypes.array.isRequired,
    /* callbacks */
    onDatasetClick: React.PropTypes.func.isRequired,
    onAddDatasetClick: React.PropTypes.func.isRequired
};

module.exports = DatasetList;
