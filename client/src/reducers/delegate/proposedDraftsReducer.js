import {
  PROPOSED_DRAFTS_BEGIN,
  PROPOSED_DRAFTS_SUCCESS,
  PROPOSED_DRAFTS_FAILURE,
} from '../../constants/action-types';

const initialState = {
  proposed: [],
  proposedLoading: true,
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
        proposed: action.payload.proposed
      };
    case PROPOSED_DRAFTS_FAILURE:
      return {
        ...state,
        proposedLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default proposedDraftsReducer;