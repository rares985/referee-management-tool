import { combineReducers } from 'redux';
import draftsReducer from './draftsReducer';
import loginReducer from './loginReducer';
import matchesReducer from './matchesReducer';
import personalInfoReducer from './personalInfoReducer';
import dashboardReducer from './dashboardReducer';
import unavailabilityPeriodsReducer from './unavailabilityPeriodsReducer';


export default combineReducers({
  matches: matchesReducer,
  drafts: draftsReducer,
  login: loginReducer,
  personal: personalInfoReducer,
  user: dashboardReducer,
  unavailabilityPeriods: unavailabilityPeriodsReducer,
});