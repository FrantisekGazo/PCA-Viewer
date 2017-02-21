# PCA Viewer

Simple desktop app created using these technologies:

<a href="http://electron.atom.io/"><img src="./readme-res/logo-electron.png" alt="Electron" title="Electron" width="80"></a>
<a href="https://facebook.github.io/react/"><img src="./readme-res/logo-react.png" alt="React" title="React" width="80"></a>
<a href="http://redux.js.org/"><img src="./readme-res/logo-redux.png" alt="Redux" title="Redux" width="80"></a>

##Project contains:

- Redux devtools 
- hot reloading for React components without babel nor webpack
- working test example


##Dependencies:

- [react](https://www.npmjs.com/package/react), [react-dom](https://www.npmjs.com/package/react-dom), [react-redux](https://www.npmjs.com/package/react-redux), [redux](https://www.npmjs.com/package/redux): basic React+Redux setup
- [redux-thunk](https://www.npmjs.com/package/redux-thunk): enables usage of async Redux actions
- [immutability-helper](https://www.npmjs.com/package/immutability-helper): mutates a copy of data without changing the original source
- [react-router](https://www.npmjs.com/package/react-router), [react-router-redux](https://www.npmjs.com/package/react-router-redux): simplifies app navigation
- [material-ui](https://www.npmjs.com/package/material-ui), [react-tap-event-plugin](https://www.npmjs.com/package/react-tap-event-plugin): a Set of React Components that Implement Google's Material Design
- [pure-color](https://www.npmjs.com/package/pure-color): utilities for ColorPicker

##Dev Dependencies:

- [electron](https://www.npmjs.com/package/electron): Electron :)
- [electron-packager](https://www.npmjs.com/package/electron-packager): Electron packager
- [redux-logger](https://www.npmjs.com/package/redux-logger): logs Redux actions
- [electron-devtools-installer](https://www.npmjs.com/package/electron-devtools-installer), [redux-devtools](https://www.npmjs.com/package/redux-devtools), [redux-devtools-extension](https://www.npmjs.com/package/redux-devtools-extension): Redux devtools
- [electron-hot-loader](https://www.npmjs.com/package/electron-hot-loader), [watch-glob](https://www.npmjs.com/package/watch-glob): hot reload
- [mocha](https://www.npmjs.com/package/mocha), [enzyme](https://www.npmjs.com/package/enzyme), [expect](https://www.npmjs.com/package/expect), [react-addons-test-utils](https://www.npmjs.com/package/react-addons-test-utils): tests
- [cross-env](https://www.npmjs.com/package/cross-env), [npm-run-all](https://www.npmjs.com/package/npm-run-all): npm cli tools
- [browserify](https://www.npmjs.com/package/browserify), [del](https://www.npmjs.com/package/del), [envify](https://www.npmjs.com/package/envify), [gulp](https://www.npmjs.com/package/gulp), [gulp-uglify](https://www.npmjs.com/package/gulp-uglify), [gulp-util](https://www.npmjs.com/package/gulp-util), [reactify](https://www.npmjs.com/package/reactify), [uglify-js](https://www.npmjs.com/package/uglify-js), [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer), [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream): Gulp build system with other useful modules for easier build management
 
## Project specific dependencies:

- [ml-pca](https://www.npmjs.com/package/ml-pca): library for calculation of principal component analysis
- [ml-matrix](https://www.npmjs.com/package/ml-matrix): matrix manipulation and computation library
- [plotly.js](https://www.npmjs.com/package/plotly.js): graphing library
