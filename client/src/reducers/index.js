import { combineReducers } from 'redux';
import delegateReducer from './delegateReducer';
import loginReducer from './loginReducer';
import matchesReducer from './matchesReducer';
import personalInfoReducer from './personalInfoReducer';
import dashboardReducer from './dashboardReducer';
import unavailabilityPeriodsReducer from './unavailabilityPeriodsReducer';


export default combineReducers({
  matches: matchesReducer,
  delegate: delegateReducer,
  login: loginReducer,
  personal: personalInfoReducer,
  user: dashboardReducer,
  unavailabilityPeriods: unavailabilityPeriodsReducer,
});