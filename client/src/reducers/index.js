import { combineReducers } from 'redux';
import delegateReducer from './delegateReducer';
import loginReducer from './loginReducer';
import matchesReducer from './matchesReducer';
import personalInfoReducer from './personalInfoReducer';
import dashboardReducer from './dashboardReducer';
import unavailabilityPeriodsReducer from './unavailabilityPeriodsReducer';
import approvableDraftsReducer from './approve/approveDraftsReducer';
import personalMatchHistoryReducer from './personalMatchHistory';


export default combineReducers({
  matches: matchesReducer,
  delegate: delegateReducer,
  approvable: approvableDraftsReducer,
  login: loginReducer,
  personal: personalInfoReducer,
  matchhistory: personalMatchHistoryReducer,
  user: dashboardReducer,
  unavailabilityPeriods: unavailabilityPeriodsReducer,
});