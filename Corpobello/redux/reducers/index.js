import { combineReducers } from 'redux';
import auth from './authReducer';
import reserves from './reservesReducer';

export default combineReducers({
  auth,
  reserves,
});
