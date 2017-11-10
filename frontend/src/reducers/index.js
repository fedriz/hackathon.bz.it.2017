import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import { user } from './user';
export const rootReducer = combineReducers({
  user,
  router: routerReducer
});
