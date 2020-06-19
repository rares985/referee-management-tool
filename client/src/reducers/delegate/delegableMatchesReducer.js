import {
  FETCH_DELEGABLE_MATCHES_BEGIN,
  FETCH_DELEGABLE_MATCHES_SUCCESS,
  FETCH_DELEGABLE_MATCHES_FAILURE,
  FETCH_ELIGIBLE_REFS_BEGIN,
  FETCH_ELIGIBLE_REFS_SUCCESS,
  FETCH_ELIGIBLE_REFS_FAILURE,
} from '../../constants/action-types';

const initialState = {
  matches: [],
  matchesLoading: true,
  shortlist: [],
  shortlistLoading: false
};

const delegableMatchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DELEGABLE_MATCHES_BEGIN:
      return {
        ...state,
      };
    case FETCH_DELEGABLE_MATCHES_SUCCESS:
      return {
        matchesLoading: false,
        shortlistLoading: true,
        matches: action.payload.matches
      };
    case FETCH_DELEGABLE_MATCHES_FAILURE:
      return {
        matchesLoading: false,
        error: action.payload.error,
      };
    case FETCH_ELIGIBLE_REFS_BEGIN:
      return {
        ...state,
      };
    case FETCH_ELIGIBLE_REFS_SUCCESS:
      return {
        shortlistLoading: false,
        shortlist: action.payload.shortlist
      };
    case FETCH_ELIGIBLE_REFS_FAILURE:
      return {
        shortlistLoading: false
      };
    default:
      return state;
  }
};

export default delegableMatchesReducer;