import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import config from 'config';

const syncHistoryMiddleware = syncHistory(browserHistory);

const middlewares = [
  applyMiddleware(
    createSagaMiddleware(rootSaga),
    syncHistoryMiddleware
  )
];

// use only for dev mode
if (!config.isProduction) {
  const DevTools = require('utils/DevTools').default;
  middlewares.push(DevTools.instrument());
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(...middlewares)
  );

  if (!config.isProduction) {
    syncHistoryMiddleware.listenForReplays(store);

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers');
        store.replaceReducer(nextReducer);
      });
    }
  }

  return store;
}
