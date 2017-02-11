"use strict";

// Needed for onTouchTap - that is required by material-ui lib
// http://stackoverflow.com/a/34015469/988941
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const { hashHistory, IndexRoute, Route, Router } = require('react-router');
const { syncHistoryWithStore } = require('react-router-redux');

const App = require('./ui/containers/App.jsx');
const StartScreen = require('./ui/containers/ConnectedStartScreen.jsx');
const SetupScreen = require('./ui/containers/ConnectedSetupScreen.jsx');
const ProjectScreen = require('./ui/containers/ConnectedProjectScreen.jsx');
const store = require('./store/renderer');


if (process.env.NODE_ENV === 'development') {
    require('watch-glob')(['src/reducer/**/*.js'], {callbackArg: 'absolute'}, f => {
        console.log('Hot reload reducer', f);
        // delete changed reducer = require(cache
        delete require.cache[require.resolve(f)];
        // delete combined reducers = require(cache
        f = f.replace(/[a-z]*.js/, '/index.js');
        delete require.cache[require.resolve(f)];
        // replace with new reducer
        const nextReducer = require(f);
        store.replaceReducer(nextReducer);
    });

    // uncomment this if you need to test component render calls
    // const { whyDidYouUpdate } = require('why-did-you-update');
    // whyDidYouUpdate(React, { include: /^EntrySpectrumPlot/, exclude: /^Connect/ });
}

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={StartScreen}/>
                <Route path="setup/" component={SetupScreen}/>
                <Route path="project/" component={ProjectScreen}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
