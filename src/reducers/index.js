import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import dashboard from './dashboard';

export default combineReducers({
  auth,
  navigation,
  dashboard,
});
