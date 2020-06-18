import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_MATCHES_BEGIN,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const LoginBegin = () => ({
  type: LOGIN_BEGIN,
});

const LoginSuccess = (username) => ({
  type: LOGIN_SUCCESS,
  payload: {
    username
  }
});

const LoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});

export const LoginAction = (request) => {
  return (dispatch) => {
    dispatch(LoginBegin());
    axios
      .post('/api/authenticate', request)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        dispatch(LoginSuccess(request.username));
      })
      .catch((err) => {
        dispatch(LoginFailure(err.error));
      });
  };
};

const FetchMatchesBegin = () => ({
  type: FETCH_MATCHES_BEGIN,
});

const FetchMatchesSuccess = (matches) => ({
  type: FETCH_MATCHES_SUCCESS,
  payload: {
    matches,
  },
});

const FetchMatchesFailure = (error) => ({
  type: FETCH_MATCHES_FAILURE,
  payload: {
    error,
  },
});

// eslint-disable-next-line import/prefer-default-export
export const FetchMatches = (request) => {
  return (dispatch) => {
    dispatch(FetchMatchesBegin());
    axios
      .get('/api/publicmatches', request)
      .then((res) => {
        dispatch(FetchMatchesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(FetchMatchesFailure(err.error));
      });
  };
};
