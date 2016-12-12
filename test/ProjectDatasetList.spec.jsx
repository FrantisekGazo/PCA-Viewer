"use strict";

const expect = require('expect');
const shallow = require('enzyme').shallow;
const React = require('react');

const ProjectDatasetList = require('../src/ui/components/ProjectDatasetList.jsx');


describe('component', () => {

    it('should render text', () => {
        const component = shallow(<ProjectDatasetList onAddDataClicked={() => {}} />);
        console.log(component);
        expect(component.text()).toInclude('Data');
    });
});
