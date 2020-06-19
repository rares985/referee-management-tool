import {
  FETCH_USER_RIGHTS_BEGIN,
  FETCH_USER_RIGHTS_SUCCESS,
  FETCH_USER_RIGHTS_FAILURE,
  LOGOUT_SUCCESS,
  // LOGOUT_BEGIN,
  // LOGOUT_FAILURE
} from '../constants/action-types';

const initialState = {
  rights: {
    delegation: false,
    approval: false,
    team: false,
  },
  loading: true,
  error: null
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_RIGHTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USER_RIGHTS_SUCCESS:
      return {
        ...state,
        rights: action.payload.rights,
        loading: false,
        error: null
      };
    case FETCH_USER_RIGHTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: true // to re-trigger user info download on login as different user in same sess
      }
    default:
      return state;
  }
};


export default dashboardReducer;