import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router,browserHistory } from 'react-router';
import DevTools from './containers/DevTools/DevTools';
import routes from './routes';
import configureStore from './store';
import './common/lib'


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('root')
);