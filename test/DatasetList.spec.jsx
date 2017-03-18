"use strict";

const expect = require('expect');
const shallow = require('enzyme').shallow;
const React = require('react');

const DatasetList = require('../src/ui/components/Project/DatasetList/DatasetList.jsx');
const DatasetListItem = require('../src/ui/components/Project/DatasetList/DatasetListItem.jsx');


describe('Dataset List', () => {

    it('should render an ADD button', () => {
        const mockDatasets = [{
            id: 1,
            name: 'Mock Dataset',
            color: '#f00'
        }];
        const includedIds = [];
        const emptyFunction = () => {};

        const component = shallow(
            <DatasetList
                datasets={mockDatasets}
                includedDatasetIds={includedIds}
                onDatasetClick={emptyFunction}
                onAddDatasetClick={emptyFunction}/>
        );

        const children = component.children();
        expect(children.length).toEqual(3);

        const lastChild = children.get(2);
        expect(lastChild.props.children.props.label).toEqual('Add');
    });

    it('item should render dataset name', () => {
        const mockDataset = {
            id: 1,
            name: 'Mock Dataset',
            color: '#f00'
        };
        const emptyFunction = () => {
        };

        const component = shallow(
            <DatasetListItem
                dataset={mockDataset}
                onClick={emptyFunction}/>
        );
        expect(component.props().primaryText).toInclude('Mock Dataset');
    });
});
