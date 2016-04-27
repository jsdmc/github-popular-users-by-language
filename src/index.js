import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import Root from './containers/Root';
import { AppContainer } from 'react-hot-loader';

import configureStore from './redux-base/configureStore';

const store = configureStore();

render(
  <AppContainer
    component={Root}
    props={{ store }}
  />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(
      <AppContainer
        component={require('./containers/Root').default}
        props={{ store }}
      />,
      document.getElementById('root')
    );
  });
}
