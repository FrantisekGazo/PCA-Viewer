"use strict";

const React = require('react');
const { RadioButton, RadioButtonGroup } = require('material-ui/RadioButton');
const TextField = require('material-ui/TextField').default;
const Checkbox = require('material-ui/Checkbox').default;

const { PROJECT_TYPE } = require('../../../store/Constants');

const styles = {
    typeBlock: {
        position: 'relative',
        padding: '10px',
        width: '200px',
        display: 'inline-block',
        verticalAlign: 'top'
    },
    radioButton: {
        marginBottom: 16,
    }
};

const ProjectTypeSelector = ({ type, sampling, hasConstantSampling, onTypeChange }) => {
    return (
        <div>
            <p>Type:</p>

            <div style={styles.typeBlock}>
                <RadioButtonGroup
                    name='project-type'
                    valueSelected={type}
                    onChange={(event, newValue) => {
                        onTypeChange({type: newValue, hasConstantSampling, sampling});
                    }}>

                    <RadioButton
                        value={PROJECT_TYPE.OFFLINE_PCA}
                        label="Offline PCA"
                        style={styles.radioButton}/>
                    <RadioButton
                        value={PROJECT_TYPE.ONLINE_PCA}
                        label="Online PCA"
                        style={styles.radioButton}/>

                </RadioButtonGroup>
            </div>

            {
                (type === PROJECT_TYPE.OFFLINE_PCA) ?
                    (
                        <div style={styles.typeBlock}>
                            <Checkbox
                                label="Dimension"
                                checked={hasConstantSampling}
                                style={styles.checkbox}
                                onCheck={(event, newValue) => {
                                    onTypeChange({type, hasConstantSampling: newValue, sampling});
                                }}/>

                            <TextField
                                id='dimension'
                                disabled={!hasConstantSampling}
                                value={(sampling > 0) ? `${sampling}` : ''}
                                onChange={(event, newValue) => {

                                    let number = parseInt(newValue);
                                    if (isNaN(number)) {
                                        number = 0;
                                    }
                                    onTypeChange({type, hasConstantSampling, sampling: number});
                                }}/>
                        </div>
                    )
                    : null
            }
        </div>
    );
};

ProjectTypeSelector.propTypes = {
    type: React.PropTypes.number.isRequired,
    hasConstantSampling: React.PropTypes.bool.isRequired,
    sampling: React.PropTypes.number.isRequired,
    onTypeChange: React.PropTypes.func.isRequired,
};

module.exports = ProjectTypeSelector;
