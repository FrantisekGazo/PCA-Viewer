"use strict";

const expect = require('expect');
const shallow = require('enzyme').shallow;
const React = require('react');

const SamplingWindowEditor = require('../src/view/components/Project/CalculationParams/SamplingWindowEditor.jsx');


describe('Sampling Window Editor', () => {

    it('should render 2 IconButtons', () => {
        const samplingWindow = {
            size: 100,
            start: 0,
            overlay: 0,
            fixedCount: 10,
        };
        const emptyFunction = () => {};

        const component = shallow(
            <SamplingWindowEditor
                samplingWindow={samplingWindow}
                onChange={emptyFunction}/>
        );

        const children = component.children();
        let iconButtonsCount = 0;
        for (let i = 0; i < children.length; i++) {
            if (children.get(i).type.muiName === 'IconButton') {
                iconButtonsCount++;
            }
        }

        expect(iconButtonsCount).toEqual(2);
    });
});
