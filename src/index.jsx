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
const StartScreen = require('./ui/containers/Start/ConnectedStartScreen.jsx');
const SetupScreen = require('./ui/containers/Setup/ConnectedSetupScreen.jsx');
const ProjectScreen = require('./ui/containers/Project/ConnectedProjectScreen.jsx');
const DatasetList = require('./ui/containers/Project/ConnectedDatasetList.jsx');
const EntryDatasetDetail = require('./ui/containers/Project/ConnectedEntryDatasetDetail.jsx');
const StreamDatasetDetail = require('./ui/containers/Project/ConnectedStreamDatasetDetail.jsx');
const SamplingWindowSizeEditor = require('./ui/containers/Project/ConnectedSamplingWindowSizeEditor.jsx');
const SamplingWindowEditor = require('./ui/containers/Project/ConnectedSamplingWindowEditor.jsx');
const ProjectResults = require('./ui/containers/Project/ConnectedProjectResults.jsx');
const EntrySelection = require('./ui/containers/Project/ConnectedEntrySelection.jsx');
const Loading = require('./ui/components/Common/Loading.jsx');
const store = require('./store/Store');


if (process.env.NODE_ENV === 'development') {
    // enable hot-reload for reducers
    require('watch-glob')(['src/store/reducer/**/*.js'], {callbackArg: 'absolute'}, f => {
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


// set window IDs
const { startListeningForWindowIds } = require('./util/WorkerUtil');
startListeningForWindowIds();


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);


// render the application
ReactDOM.render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
            <Route path="/" component={App}>

                <IndexRoute component={StartScreen}/>

                <Route path="setup/" component={SetupScreen}/>

                <Route path="project/" component={ProjectScreen}>
                    <IndexRoute components={{
                        loading: Loading
                    }}/>
                    <Route path="offline0/" components={{
                        datasets: DatasetList,
                        detail: StreamDatasetDetail,
                        calculationParams: SamplingWindowSizeEditor,
                        results: ProjectResults,
                        entrySelection: EntrySelection,
                    }}/>
                    <Route path="offline1/" components={{
                        datasets: DatasetList,
                        detail: EntryDatasetDetail,
                        calculationParams: null,
                        results: ProjectResults,
                        entrySelection: EntrySelection,
                    }}/>
                    <Route path="online/" components={{
                        datasets: null,
                        detail: StreamDatasetDetail,
                        calculationParams: SamplingWindowEditor,
                        results: ProjectResults,
                        entrySelection: EntrySelection,
                    }}/>
                </Route>

            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
