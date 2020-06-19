import {
  FETCH_PERSONAL_INFO_BEGIN,
  FETCH_PERSONAL_INFO_SUCCESS,
  FETCH_PERSONAL_INFO_FAILURE,
} from '../constants/action-types';

const initialState = {
  info: {},
  loading: true,
  error: null
};

const personalInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERSONAL_INFO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        info: action.payload.info,
        loading: false,
        error: null
      };
    case FETCH_PERSONAL_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default personalInfoReducer;