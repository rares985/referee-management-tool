import {
  FETCH_DELEGABLE_MATCHES_BEGIN,
  FETCH_DELEGABLE_MATCHES_SUCCESS,
  FETCH_DELEGABLE_MATCHES_FAILURE,
  FETCH_ELIGIBLE_REFS_BEGIN,
  FETCH_ELIGIBLE_REFS_SUCCESS,
  FETCH_ELIGIBLE_REFS_FAILURE,
} from '../constants/action-types';

const initialState = {
  matches: [],
  shortlist: [],
  matchesLoading: true,
  shortlistLoading: false,
  error: null
};

const draftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DELEGABLE_MATCHES_BEGIN:
      return {
        ...state,
        matchesLoading: true,
        shortlistLoading: false,
        error: null,
      };
    case FETCH_DELEGABLE_MATCHES_SUCCESS:
      return {
        ...state,
        matchesLoading: false,
        shortlistLoading: true,
        error: null,
        matches: action.payload.matches,
      };
    case FETCH_DELEGABLE_MATCHES_FAILURE:
      return {
        ...state,
        matchesLoading: false,
        shortlistLoading: true,
        error: action.payload.error,

      };
    case FETCH_ELIGIBLE_REFS_BEGIN:
      return {
        ...state,
        shortlistLoading: true,
        error: null,

      };
    case FETCH_ELIGIBLE_REFS_SUCCESS:
      return {
        ...state,
        shortlistLoading: false,
        error: null,
        shortlist: action.payload.shortlist

      };
    case FETCH_ELIGIBLE_REFS_FAILURE:
      return {
        ...state,
        shortlistLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};


export default draftsReducer;