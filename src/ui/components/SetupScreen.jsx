"use strict";

const React = require('react');
const AppBar = require('material-ui/AppBar').default;
const { Card, CardMedia, CardActions } = require('material-ui/Card');
const TextField = require('material-ui/TextField').default;
const IconButton = require('material-ui/IconButton').default;
const IconBack = require('material-ui/svg-icons/navigation/arrow-back').default;
const IconMore = require('material-ui/svg-icons/navigation/more-vert').default;
const IconMenu = require('material-ui/IconMenu').default;
const MenuItem = require('material-ui/MenuItem').default;
const RaisedButton = require('material-ui/RaisedButton').default;

const HelpService = require('../../service/HelpService');

const showMenu = require('../menu/Menu');


class SetupScreen extends React.Component {

    render() {
        showMenu();

        // DialogService.showOpenCreateDirDialog()
        //     .then((dir) => {
        //     })
        //     .catch((err) => {
        //         dispatch(createProjectErrorAction(err.message));
        //     });

        return (
            <div>

                <AppBar
                    style={{
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        top: 0,
                    }}
                    title='New Project'
                    iconElementLeft={
                        <IconButton>
                            <IconBack onTouchTap={this.props.onBackClick}/>
                        </IconButton>
                    }
                    iconElementRight={
                        <IconMenu
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            iconButtonElement={
                                <IconButton><IconMore /></IconButton>
                            }>

                            <MenuItem primaryText='Help' onTouchTap={() => HelpService.showHelp()}/>
                        </IconMenu>
                    }/>

                <div
                    id='content'
                    style={{
                        position: 'absolute',
                        top: '70px',
                        left: '10px',
                        right: '10px',
                        bottom: '10px',
                    }}>

                </div>
            </div>
        );
    }
}

SetupScreen.propTypes = {
    onCreateClick: React.PropTypes.func.isRequired,
    onBackClick: React.PropTypes.func.isRequired,
};

module.exports = SetupScreen;
