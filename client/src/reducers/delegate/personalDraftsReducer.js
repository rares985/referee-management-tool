import {
  PERSONAL_DRAFTS_BEGIN,
  PERSONAL_DRAFTS_SUCCESS,
  PERSONAL_DRAFTS_FAILURE
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
      return {
        ...state,
      };
    case PERSONAL_DRAFTS_SUCCESS:
      return {
        drafts: action.payload.drafts,
        draftsLoading: false,
      };
    case PERSONAL_DRAFTS_FAILURE:
      return {
        draftsLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default personalDraftsReducer;

