import {
  PROPOSED_DRAFTS_BEGIN,
  PROPOSED_DRAFTS_SUCCESS,
  PROPOSED_DRAFTS_FAILURE,
  PROPOSED_SHORTLIST__BEGIN,
  PROPOSED_SHORTLIST__SUCCESS,
  PROPOSED_SHORTLIST__FAILURE,
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
    case PROPOSED_SHORTLIST__BEGIN:
      return {
        ...state,
      };
    case PROPOSED_SHORTLIST__SUCCESS:
      return {
        ...state,
        shortlistLoading: false,
        shortlist: action.payload.shortlist
      };
    case PROPOSED_SHORTLIST__FAILURE:
      return {
        ...state,
        shortlistLoading: false
      };
    default:
      return state;
  }
};

export default proposedDraftsReducer;