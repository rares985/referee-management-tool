import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_MATCHES_BEGIN,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE
} from '../constants/action-types';

const initialState = {
  matchesPage: {
    matches: [],
    loading: true,
    error: null
  },
  loginPage: {
    matches: [],
    loading: true,
    error: null
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...state
      };
    case LOGIN_SUCCESS:
      return {
        ...state
      };
    case LOGIN_FAILURE:
      return {
        ...state
      };
    case FETCH_MATCHES_BEGIN:
      return {
        ...state,
        matchesPage: {
          ...state.matchesPage,
          loading: true
        }
      };
    case FETCH_MATCHES_SUCCESS:
      return {
        ...state,
        matchesPage: {
          matches: action.payload.matches,
          loading: false,
          error: null
        }
      };
    case FETCH_MATCHES_FAILURE:
      return {
        ...state,
        matchesPage: {
          ...state.matchesPage,
          loading: false,
          error: action.payload.error,
        }
      };
    default:
      return state;
  }
};


export default rootReducer;