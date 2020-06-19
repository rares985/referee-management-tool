import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from '../constants/action-types';


const initialState = {
  user: '',
  loading: false, // only loads on submit
  finished: false, // set to true on login success
  error: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.username,
        finished: true,
        loading: false,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: '',
        finished: false,
      }
    default:
      return state;
  }
};


export default loginReducer;