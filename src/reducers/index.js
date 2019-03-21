import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import dashboard from './dashboard';
import layout from './layout';

export default combineReducers({
  auth,
  navigation,
  dashboard,
  layout,
});
