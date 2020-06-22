import {
  FETCH_PERSONAL_DRAFTS_BEGIN,
  FETCH_PERSONAL_DRAFTS_SUCCESS,
  FETCH_PERSONAL_DRAFTS_FAILURE
} from '../../constants/action-types';

const initialState = {
  drafts: [],
  draftsLoading: true,
};

const personalDraftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERSONAL_DRAFTS_BEGIN:
      return {
        ...state,
      };
    case FETCH_PERSONAL_DRAFTS_SUCCESS:
      return {
        drafts: action.payload.drafts,
        draftsLoading: false,
      };
    case FETCH_PERSONAL_DRAFTS_FAILURE:
      return {
        draftsLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default personalDraftsReducer;

