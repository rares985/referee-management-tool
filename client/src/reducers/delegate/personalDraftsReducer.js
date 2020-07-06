import {
  PERSONAL_DRAFTS_BEGIN,
  PERSONAL_DRAFTS_SUCCESS,
  PERSONAL_DRAFTS_FAILURE,
  PERSONAL_DRAFTS_SHORTLIST_BEGIN,
  PERSONAL_DRAFTS_SHORTLIST_SUCCESS,
  PERSONAL_DRAFTS_SHORTLIST_FAILURE,
} from '../../constants/action-types';

const initialState = {
  drafts: [],
  draftsLoading: true,
  shortlist: [],
  shortlistLoading: true,
};

const personalDraftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONAL_DRAFTS_BEGIN:
      return state;
    case PERSONAL_DRAFTS_SUCCESS:
      return {
        ...state,
        drafts: action.payload.drafts,
        draftsLoading: false,
      };
    case PERSONAL_DRAFTS_FAILURE:
      return {
        ...state,
        draftsLoading: false,
        error: action.payload.error,
      };
    case PERSONAL_DRAFTS_SHORTLIST_BEGIN:
      return state;
    case PERSONAL_DRAFTS_SHORTLIST_SUCCESS:
      return {
        ...state,
        shortlistLoading: false,
        shortlist: action.payload.shortlist,
      };
    case PERSONAL_DRAFTS_SHORTLIST_FAILURE:
      return {
        ...state,
        shortlistLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default personalDraftsReducer;
