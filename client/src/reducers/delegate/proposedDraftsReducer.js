import {
  PROPOSED_DRAFTS_BEGIN,
  PROPOSED_DRAFTS_SUCCESS,
  PROPOSED_DRAFTS_FAILURE,
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
    case PROPOSED_DRAFTS_BEGIN:
      return {
        ...state,
      };
    case PROPOSED_DRAFTS_SUCCESS:
      return {
        ...state,
        proposedLoading: false,
        shortlistLoading: true,
        proposed: action.payload.proposed
      };
    case PROPOSED_DRAFTS_FAILURE:
      return {
        ...state,
        proposedLoading: false,
        error: action.payload.error,
      };
    case FETCH_PROPOSED_SHORTLIST_BEGIN:
      return {
        ...state,
      };
    case FETCH_PROPOSED_SHORTLIST_SUCCESS:
      return {
        ...state,
        shortlistLoading: false,
        shortlist: action.payload.shortlist
      };
    case FETCH_PROPOSED_SHORTLIST_FAILURE:
      return {
        ...state,
        shortlistLoading: false
      };
    default:
      return state;
  }
};

export default proposedDraftsReducer;