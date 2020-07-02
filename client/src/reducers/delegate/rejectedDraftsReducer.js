import {
  REJECTED_DRAFTS_BEGIN,
  REJECTED_DRAFTS_SUCCESS,
  REJECTED_DRAFTS_FAILURE,
  REJECTED_SHORTLIST_BEGIN,
  REJECTED_SHORTLIST_SUCCESS,
  REJECTED_SHORTLIST_FAILURE,
} from '../../constants/action-types';

const initialState = {
  rejected: [],
  rejectedLoading: true,
  shortlist: [],
  shortlistLoading: false
};

const rejectedDraftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REJECTED_DRAFTS_BEGIN:
      return {
        ...state,
      };
    case REJECTED_DRAFTS_SUCCESS:
      return {
        ...state,
        rejectedLoading: false,
        shortlistLoading: true,
        rejected: action.payload.rejected
      };
    case REJECTED_DRAFTS_FAILURE:
      return {
        ...state,
        rejectedLoading: false,
        error: action.payload.error,
      };
    case REJECTED_SHORTLIST_BEGIN:
      return {
        ...state,
      };
    case REJECTED_SHORTLIST_SUCCESS:
      return {
        ...state,
        shortlistLoading: false,
        shortlist: action.payload.shortlist
      };
    case REJECTED_SHORTLIST_FAILURE:
      return {
        ...state,
        shortlistLoading: false
      };
    default:
      return state;
  }
};

export default rejectedDraftsReducer;