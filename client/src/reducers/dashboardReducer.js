import {
  FETCH_USER_RIGHTS_BEGIN,
  FETCH_USER_RIGHTS_SUCCESS,
  FETCH_USER_RIGHTS_FAILURE
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
    default:
      return state;
  }
};


export default dashboardReducer;