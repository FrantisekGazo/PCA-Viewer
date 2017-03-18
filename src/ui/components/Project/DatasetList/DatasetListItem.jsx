"use strict";

const React = require('react');
const { ListItem } = require('material-ui/List');
const Avatar = require('material-ui/Avatar').default;


/**
 * Shows one dataset in a list item component.
 */
const DatasetListItem = ({dataset, onClick}) => {
    return (
        <ListItem onTouchTap={onClick}
                  primaryText={dataset.name}
                  leftAvatar={
                      <Avatar
                          color="#fff"
                          backgroundColor={dataset.color}
                          size={30}
                          style={{margin: 5}}>
                          {dataset.name.substr(0, 1)}
                      </Avatar>
                  }/>
    )
};

DatasetListItem.propTypes = {
    /* dataset */
    dataset: React.PropTypes.object.isRequired,
    /* callback that will be called if dataset was clicked */
    onClick: React.PropTypes.func.isRequired
};

module.exports = DatasetListItem;
