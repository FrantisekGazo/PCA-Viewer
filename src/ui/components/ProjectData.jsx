"use strict";

const React = require('react');


const ProjectData = ({onAddDataClicked}) => {
    return (
        <div>
            <h2>Data</h2>
            <button onClick={onAddDataClicked}>Add data</button>
        </div>
    )
};

ProjectData.propTypes = {
    onAddDataClicked: React.PropTypes.func.isRequired
};

module.exports = ProjectData;
