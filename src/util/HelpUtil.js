"use strict";

const shell = require('electron').shell;


const GITHUB_PROJECT_ISSUES = 'https://github.com/FrantisekGazo/PCA-Viewer/issues';

/**
 * Provides methods for helping user with anything app related.
 */
class HelpUtil {

    /**
     * Opens a site where user can ask about any problem with the application.
     */
    static showHelp() {
        shell.openExternal(GITHUB_PROJECT_ISSUES);
    }
}


module.exports = HelpUtil;
