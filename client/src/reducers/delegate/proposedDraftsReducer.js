import {
  FETCH_PROPOSED_DRAFTS_BEGIN,
  FETCH_PROPOSED_DRAFTS_SUCCESS,
  FETCH_PROPOSED_DRAFTS_FAILURE,
  FETCH_PROPOSED_SHORTLIST_BEGIN,
  FETCH_PROPOSED_SHORTLIST_SUCCESS,
  FETCH_PROPOSED_SHORTLIST_FAILURE,
} from '../../constants/action-types';

const initialState = {
  proposed: [],
  proposedLoading: true,
  shortlist: [],
  shortlistLoading: false
};

const proposedDraftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPOSED_DRAFTS_BEGIN:
      return {
        ...state,
      };
    case FETCH_PROPOSED_DRAFTS_SUCCESS:
      return {
        proposedLoading: false,
        shortlistLoading: true,
        proposed: action.payload.proposed
      };
    case FETCH_PROPOSED_DRAFTS_FAILURE:
      return {
        proposedLoading: false,
        error: action.payload.error,
      };
    case FETCH_PROPOSED_SHORTLIST_BEGIN:
      return {
        ...state,
      };
    case FETCH_PROPOSED_SHORTLIST_SUCCESS:
      return {
        shortlistLoading: false,
        shortlist: action.payload.shortlist
      };
    case FETCH_PROPOSED_SHORTLIST_FAILURE:
      return {
        shortlistLoading: false
      };
    default:
      return state;
  }
};

export default proposedDraftsReducer;