import {
  FETCH_PERSONAL_INFO_BEGIN,
  FETCH_PERSONAL_INFO_SUCCESS,
  FETCH_PERSONAL_INFO_FAILURE,
  UPDATE_PERSONAL_INFO_BEGIN,
  UPDATE_PERSONAL_INFO_SUCCESS,
  UPDATE_PERSONAL_INFO_FAILURE,
} from '../constants/action-types';

const initialState = {
  info: {},
  loading: true,
  error: null,
};

const personalInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERSONAL_INFO_BEGIN:
      return {
        ...state,
      };
    case FETCH_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        info: action.payload.info,
        loading: false,
        error: null,
      };
    case FETCH_PERSONAL_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_PERSONAL_INFO_BEGIN:
      return {
        ...state,
      };
    case UPDATE_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PERSONAL_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default personalInfoReducer;
