module.exports = function createClassName(names) {
    let className = '';

    for (const property in names) {
        if (names.hasOwnProperty(property)) {
            if (names[property] === true) {
                className += ` ${property}`;
            }
        }
    }

    return className;
};
