import {
  FETCH_REJECTED_DRAFTS_BEGIN,
  FETCH_REJECTED_DRAFTS_SUCCESS,
  FETCH_REJECTED_DRAFTS_FAILURE,
  FETCH_REJECTED_SHORTLIST_BEGIN,
  FETCH_REJECTED_SHORTLIST_SUCCESS,
  FETCH_REJECTED_SHORTLIST_FAILURE,
} from '../../constants/action-types';

const initialState = {
  rejected: [],
  rejectedLoading: true,
  shortlist: [],
  shortlistLoading: false
};

const rejectedDraftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REJECTED_DRAFTS_BEGIN:
      return {
        ...state,
      };
    case FETCH_REJECTED_DRAFTS_SUCCESS:
      return {
        ...state,
        rejectedLoading: false,
        shortlistLoading: true,
        rejected: action.payload.rejected
      };
    case FETCH_REJECTED_DRAFTS_FAILURE:
      return {
        ...state,
        rejectedLoading: false,
        error: action.payload.error,
      };
    case FETCH_REJECTED_SHORTLIST_BEGIN:
      return {
        ...state,
      };
    case FETCH_REJECTED_SHORTLIST_SUCCESS:
      return {
        ...state,
        shortlistLoading: false,
        shortlist: action.payload.shortlist
      };
    case FETCH_REJECTED_SHORTLIST_FAILURE:
      return {
        ...state,
        shortlistLoading: false
      };
    default:
      return state;
  }
};

export default rejectedDraftsReducer;