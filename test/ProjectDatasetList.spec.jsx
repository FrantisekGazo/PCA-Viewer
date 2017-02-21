"use strict";

const expect = require('expect');
const shallow = require('enzyme').shallow;
const React = require('react');

const ProjectDatasetList = require('./components/Project/DatasetList.jsx');


describe('component', () => {

    it('should render text', () => {
        const mockDatasets = [];
        const emptyFunction = () => {};

        const component = shallow(<ProjectDatasetList datasets={mockDatasets}
                                                      onDatasetClicked={emptyFunction}
                                                      onAddDatasetClicked={emptyFunction}/>);
        console.log(component);
        expect(component.text()).toInclude('Add data');
    });
});
