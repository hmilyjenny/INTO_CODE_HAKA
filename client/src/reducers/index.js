import {combineReducers} from 'redux';
import auth from './authReducer';
import project from './projectReducer';
import channels from './channelsReducer';

const rootReducer = combineReducers({
    auth,
    project,
    channels
});

export default rootReducer;
