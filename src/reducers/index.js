import { combineReducers } from 'redux';
import navigation from './navigation';
import dashboard from './dashboard';
import layout from './layout';

export default combineReducers({
  navigation,
  dashboard,
  layout,
});
