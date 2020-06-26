import {
  APPROVABLE_DRAFTS_BEGIN,
  APPROVABLE_DRAFTS_SUCCESS,
  APPROVABLE_DRAFTS_FAILURE,
} from '../../constants/action-types';

const initialState = {
  drafts: [],
  draftsLoading: true,
};

const approvableDraftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPROVABLE_DRAFTS_BEGIN:
      return {
        ...state,
      };
    case APPROVABLE_DRAFTS_SUCCESS:
      return {
        ...state,
        drafts: action.payload.drafts,
        draftsLoading: false,
      };
    case APPROVABLE_DRAFTS_FAILURE:
      return {
        ...state,
        draftsLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default approvableDraftsReducer;

