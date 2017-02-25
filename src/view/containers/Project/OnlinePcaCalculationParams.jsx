"use strict";

const React = require('react');
const { Card } = require('material-ui/Card');

const ConnectedStreamWindowSelector = require('./ConnectedSamplingWindowEditor');


/**
 * Shows a Card with parameters for the online PCA calculation.
 */
module.exports = ({}) => (
    <Card>
        <ConnectedStreamWindowSelector/>
    </Card>
);
