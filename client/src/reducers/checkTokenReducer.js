import {
  CHECK_TOKEN_BEGIN,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAILURE,
} from '../constants/action-types';

const initialState = {
  redirectTime: REDIRECT_WAIT_SEC,
  message: '',
  error: null,
  loading: true,
  redirect: false,
};

const checkTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_TOKEN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case CHECK_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        redirect: true,
        error: action.payload.error
      };
    default:
      return state;
  }
};


export default checkTokenReducer;