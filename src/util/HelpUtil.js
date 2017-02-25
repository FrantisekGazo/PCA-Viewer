"use strict";

const shell = require('electron').shell;


const GITHUB_PROJECT_ISSUES = 'https://github.com/FrantisekGazo/PCA-Viewer/issues';

function showHelp() {
    shell.openExternal(GITHUB_PROJECT_ISSUES);
}


module.exports = {
    showHelp,
};
