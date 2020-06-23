import {
  FETCH_USER_RIGHTS_BEGIN,
  FETCH_USER_RIGHTS_SUCCESS,
  FETCH_USER_RIGHTS_FAILURE,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchUserRightsBegin = () => ({
  type: FETCH_USER_RIGHTS_BEGIN
});

const FetchUserRightsSuccess = (rights) => ({
  type: FETCH_USER_RIGHTS_SUCCESS,
  payload: {
    rights,
  }
});

const FetchUserRightsFailure = (error) => ({
  type: FETCH_USER_RIGHTS_FAILURE,
  payload: {
    error
  }
});


export const FetchUserRights = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchUserRightsBegin());

    axios.get('/api/userinfo', GetRequest)
      .then(res => {
        dispatch(FetchUserRightsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchUserRightsFailure(err.error));
      })
  }
};

const LogoutBegin = () => ({
  type: LOGOUT_BEGIN
});

const LogoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const LogoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: {
    error
  }
});


export const LogoutUser = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(LogoutBegin());

    axios.get('/api/authenticate/logout', GetRequest)
      // eslint-disable-next-line no-unused-vars
      .then(res => {
        dispatch(LogoutSuccess());
      })
      .catch(err => {
        dispatch(LogoutFailure(err.error));
      })
  }
};