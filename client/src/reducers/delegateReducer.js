import { combineReducers } from 'redux';
import delegableMatchesReducer from './delegate/delegableMatchesReducer';
import proposedDraftsReducer from './delegate/proposedDraftsReducer';
import rejectedDraftsReducer from './delegate/rejectedDraftsReducer';
import personalDraftsReducer from './delegate/personalDraftsReducer';


const draftsReducer = combineReducers({
  delegable: delegableMatchesReducer,
  proposed: proposedDraftsReducer,
  rejected: rejectedDraftsReducer,
  personal: personalDraftsReducer
})


export default draftsReducer;