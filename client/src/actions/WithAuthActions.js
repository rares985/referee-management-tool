import {
  CHECK_TOKEN_BEGIN,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAILURE,
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const CheckTokenBegin = () => ({
  type: CHECK_TOKEN_BEGIN
});

const CheckTokenSuccess = (rights) => ({
  type: CHECK_TOKEN_SUCCESS,
  payload: {
    rights,
  }
});

const CheckTokenFailure = (error) => ({
  type: CHECK_TOKEN_FAILURE,
  payload: {
    error
  }
});


const CheckToken = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(CheckTokenBegin());

    axios.get('/api/checkToken', GetRequest)
      .then(res => {
        dispatch(CheckTokenSuccess(res.data));
      })
      .catch(err => {
        dispatch(CheckTokenFailure(err.error));
      })
  }
};

export default CheckToken;