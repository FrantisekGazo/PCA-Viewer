"use strict";

const React = require('react');
const { Card } = require('material-ui/Card');

const ConnectedStreamWindowSizeEditor = require('./ConnectedStreamWindowSizeEditor');
const ConnectedStreamWindowSelector = require('./ConnectedStreamWindowSelector');


/**
 * Shows a Card with parameters for the online PCA calculation.
 */
module.exports = ({}) => (
    <Card>
        <ConnectedStreamWindowSizeEditor/>
        <ConnectedStreamWindowSelector/>
    </Card>
);
