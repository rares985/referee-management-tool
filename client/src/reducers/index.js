import { combineReducers } from 'redux';
import draftsReducer from './draftsReducer';
import loginReducer from './loginReducer';
import matchesReducer from './matchesReducer';

// const initialState = {
//   matchesPage: {
//     matches: [],
//     loading: true,
//     error: null
//   },
//   loginPage: {
//     logged_user: '',
//     loading: false, // only loads on submit
//     error: null
//   },
//   draftsPage: {
//     matches: [],
//     shortlist: [],
//     matchesLoading: true,
//     shortlistLoading: false,
//     error: null
//   },
// }


export default combineReducers({
  matches: matchesReducer,
  drafts: draftsReducer,
  login: loginReducer
});