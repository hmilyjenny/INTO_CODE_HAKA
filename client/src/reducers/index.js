import {combineReducers} from 'redux';
//import auth from './authReducer';
import project from './projectReducer';

const rootReducer = combineReducers({
  project
});

export default rootReducer;
