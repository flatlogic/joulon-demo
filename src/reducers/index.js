import { combineReducers } from 'redux';
import navigation from './navigation';
import dashboard from './dashboard';
import layout from './layout';
import auth from './auth';

export default combineReducers({
  navigation,
  dashboard,
  layout,
  auth,
});
