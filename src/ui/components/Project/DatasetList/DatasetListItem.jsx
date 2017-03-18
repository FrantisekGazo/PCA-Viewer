"use strict";

const React = require('react');
const { ListItem } = require('material-ui/List');
const Avatar = require('material-ui/Avatar').default;


/**
 * React component that shows one dataset name and color.
 */
class DatasetListItem extends React.Component {

    render() {
        const { dataset, onClick } = this.props;

        return (
            <ListItem onTouchTap={onClick}
                      primaryText={dataset.name}
                      leftAvatar={
                          <Avatar
                              color={'#FFFFFF'}
                              backgroundColor={dataset.color}
                              size={30}
                              style={{margin: 5}}>
                              {dataset.name.substr(0, 1)}
                          </Avatar>
                      }/>
        )
    }
}

DatasetListItem.propTypes = {
    /* dataset */
    dataset: React.PropTypes.object.isRequired,
    /* callback that will be called if dataset was clicked */
    onClick: React.PropTypes.func.isRequired
};

module.exports = DatasetListItem;
