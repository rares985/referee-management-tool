import { combineReducers } from 'redux';
import delegateReducer from './delegateReducer';
import loginReducer from './loginReducer';
import matchesReducer from './matchesReducer';
import personalInfoReducer from './personalInfoReducer';
import dashboardReducer from './dashboardReducer';
import unavailabilityPeriodsReducer from './unavailabilityPeriodsReducer';
import approvableDraftsReducer from './approve/approveDraftsReducer';


export default combineReducers({
  matches: matchesReducer,
  delegate: delegateReducer,
  approvable: approvableDraftsReducer,
  login: loginReducer,
  personal: personalInfoReducer,
  user: dashboardReducer,
  unavailabilityPeriods: unavailabilityPeriodsReducer,
});