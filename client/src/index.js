import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router,browserHistory } from 'react-router';
import DevTools from './containers/DevTools/DevTools';
import routes from './routes';
import configureStore from './store';
import 'antd/lib/index.css';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes} />
      <DevTools/>
    </div>
  </Provider>, document.getElementById('app')
);