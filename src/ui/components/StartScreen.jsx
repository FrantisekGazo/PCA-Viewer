"use strict";

const React = require('react');
const { Card, CardActions } = require('material-ui/Card');
const FlatButton = require('material-ui/FlatButton').default;

const showMenu = require('../menu/Menu');


const StartScreen = ({error, onStartNewClicked, onOpenExistingClicked}) => {
    let errorMsg = (error) ? (<p>{error}</p>) : null;

    showMenu();

    return (
        <div>
            { errorMsg }

            <Card
                style={{
                    position: 'absolute',
                    top: '0px'
                }}>
                <CardActions>
                    <FlatButton
                        label="Start a new project"
                        onTouchTap={onStartNewClicked}/>
                    <FlatButton
                        label="Open an existing project"
                        onTouchTap={onOpenExistingClicked}/>
                </CardActions>
            </Card>
        </div>
    );
};

StartScreen.propTypes = {
    error: React.PropTypes.string.isRequired,
    onStartNewClicked: React.PropTypes.func.isRequired,
    onOpenExistingClicked: React.PropTypes.func.isRequired
};

module.exports = StartScreen;
