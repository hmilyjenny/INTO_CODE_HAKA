import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router,browserHistory } from 'react-router';
import DevTools from './containers/DevTools/DevTools';
import routes from './routes';
import configureStore from './store';
import './common/lib';


const store = configureStore();

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes} />
      <DevTools/>
    </div>
  </Provider>, document.getElementById('app')
);