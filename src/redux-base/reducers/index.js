import { combineReducers } from 'redux';

import { routeReducer } from 'react-router-redux';
import selectedLanguage from './selectedLanguage';
import usersByLanguage from './usersByLanguage';

export default combineReducers({
  routing: routeReducer,
  selectedLanguage,
  usersByLanguage
});
