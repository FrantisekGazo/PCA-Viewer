"use strict";

const React = require('react');


const Tester = ({text, error, onProcessClicked, onChooseDirClicked}) => {
    let input;

    return (
        <div>
            <h3>{text}</h3>
            <h4>{error}</h4>

            <form onSubmit={e => {
                e.preventDefault();
                onProcessClicked(input.value.trim());
            }}>
                <input ref={node => {
                    input = node
                }}/>

                <button type="submit">Process</button>
            </form>

            <button onClick={onChooseDirClicked}>Choose directory</button>
        </div>
    )
};

Tester.propTypes = {
    text: React.PropTypes.string.isRequired,
    error: React.PropTypes.string.isRequired,
    onProcessClicked: React.PropTypes.func.isRequired,
    onChooseDirClicked: React.PropTypes.func.isRequired
};

module.exports = Tester;
