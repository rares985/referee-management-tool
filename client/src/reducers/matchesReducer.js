import {
  FETCH_MATCHES_BEGIN,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE
} from '../constants/action-types';

const initialState = {
  matches: [],
  loading: true,
  error: null
};

const matchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MATCHES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_MATCHES_SUCCESS:
      return {
        ...state,
        matches: action.payload.matches,
        loading: false,
        error: null
      };
    case FETCH_MATCHES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};


export default matchesReducer;