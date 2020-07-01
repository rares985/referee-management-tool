import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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

const LoginAction = (request) => {
  return (dispatch) => {
    dispatch(LoginBegin());
    axios
      .post('/api/authenticate', request)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        dispatch(LoginSuccess(request.username));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(LoginFailure("Bad password/username"));
        }
      })
  };
};

export default LoginAction;