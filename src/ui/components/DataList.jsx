"use strict";

const React = require('react');

const DataListItem = require('./DataListItem.jsx');


const DataList = ({data, onDataClick, onAddDataClick}) => {
    const list = data.map(d => (<DataListItem key={d.id}
                                              data={d}
                                              onClick={() => onDataClick(d.id)}/>));

    return (
        <div>
            Data:
            <ul>{list}</ul>
            <button onClick={onAddDataClick}>Add Data</button>
        </div>
    );
};

DataList.propTypes = {
    data: React.PropTypes.array.isRequired,
    onDataClick: React.PropTypes.func.isRequired,
    onAddDataClick: React.PropTypes.func.isRequired
};

module.exports = DataList;
