import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import Home from './view/Home';
import Login from './view/Login';
import Dashboard from './view/Dashboard';
import Projects from './view/Projects';
import NotFound from './view/NotFound';

export default(
   <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/dashboard' component={Dashboard}  >
        <Route path='projects/:userId' component={Projects} />
      </Route>
       <Route path='*' component={NotFound} />
  </Route>
);