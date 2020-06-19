import { combineReducers } from 'redux';
import delegableMatchesReducer from './delegate/delegableMatchesReducer';
import proposedDraftsReducer from './delegate/proposedDraftsReducer';
import rejectedDraftsReducer from './delegate/rejectedDraftsReducer';


const draftsReducer = combineReducers({
  delegable: delegableMatchesReducer,
  proposed: proposedDraftsReducer,
  rejected: rejectedDraftsReducer
})


export default draftsReducer;