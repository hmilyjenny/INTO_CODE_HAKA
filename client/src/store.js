import { createStore, applyMiddleware,compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import DevTools from './containers/DevTools/DevTools';

export default function configureStore(initialState = {}) {

  let finalCreateStore;

   finalCreateStore = compose(
      applyMiddleware(thunkMiddleware),
      DevTools.instrument()
    )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
