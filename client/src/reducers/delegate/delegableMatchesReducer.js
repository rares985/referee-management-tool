import {
  DELEGABLE_MATCHES_BEGIN,
  DELEGABLE_MATCHES_SUCCESS,
  DELEGABLE_MATCHES_FAILURE,
  ELIGIBLE_REFS_BEGIN,
  ELIGIBLE_REFS_SUCCESS,
  ELIGIBLE_REFS_FAILURE,
} from '../../constants/action-types';

const initialState = {
  matches: [],
  matchesLoading: true,
  shortlist: [],
  shortlistLoading: true
};

const delegableMatchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELEGABLE_MATCHES_BEGIN:
      return {
        ...state,
      };
    case DELEGABLE_MATCHES_SUCCESS:
      return {
        ...state,
        matchesLoading: false,
        matches: action.payload.matches
      };
    case DELEGABLE_MATCHES_FAILURE:
      return {
        ...state,
        matchesLoading: false,
        error: action.payload.error,
      };
    case ELIGIBLE_REFS_BEGIN:
      return {
        ...state,
        shortlistLoading: true,
      };
    case ELIGIBLE_REFS_SUCCESS:
      return {
        ...state,
        shortlistLoading: false,
        shortlist: action.payload.shortlist
      };
    case ELIGIBLE_REFS_FAILURE:
      return {
        ...state,
        shortlistLoading: false
      };
    default:
      return state;
  }
};

export default delegableMatchesReducer;