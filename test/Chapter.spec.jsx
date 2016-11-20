"use strict";

const expect = require('expect');
const shallow = require('enzyme').shallow;
const React = require('react');

const Counter = require('../src/ui/components/Counter.jsx');


describe('component', () => {

    it('should render text', () => {
        const component = shallow(<Counter value={1} onIncClicked={() => {}} onDecClicked={() => {}} />);
        expect(component.text()).toInclude('Counter: 1');
    });
});
