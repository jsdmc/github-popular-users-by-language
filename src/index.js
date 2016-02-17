import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import configureStore from './redux-base/configureStore';
import getRoutes from './routes';

import config from 'config';

const store = configureStore();

let appRootComponent;

if (!config.isProduction) {
	// Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  const DevTools = require('utils/DevTools').default;
  appRootComponent = () => (
    <Provider store={store}>
      <div>
        <Router history={browserHistory} routes={getRoutes(store)}/>
        <DevTools />
      </div>
    </Provider>
  );
} else {
  appRootComponent = () => (
    <Provider store={store}>
      <Router history={browserHistory} routes={getRoutes(store)}/>
    </Provider>
  );
}

ReactDOM.render(appRootComponent(), document.getElementById('root'));
