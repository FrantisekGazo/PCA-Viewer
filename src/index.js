"use strict";

if (process.env.NODE_ENV === 'development') {
    // enable hot-reload
    const electronHot = require('electron-hot-loader');
    electronHot.install({higherOrderFunctions: ['connect']});
    electronHot.watchJsx(['src/**/*.jsx']);
    electronHot.watchCss(['src/assets/**/*.css']);
}

// initialize the process
require('./index.jsx');