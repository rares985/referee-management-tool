import {
  PERSONAL_MATCH_HISTORY_BEGIN,
  PERSONAL_MATCH_HISTORY_SUCCESS,
  PERSONAL_MATCH_HISTORY_FAILURE,
} from '../constants/action-types';

const initialState = {
  matches: [],
  loading: false,
  error: null
};

const personalMatchHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONAL_MATCH_HISTORY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case PERSONAL_MATCH_HISTORY_SUCCESS:
      return {
        ...state,
        matches: action.payload.matches,
        loading: false,
      };
    case PERSONAL_MATCH_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default personalMatchHistoryReducer;