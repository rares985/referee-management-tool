import {
  FETCH_MATCHES_BEGIN,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE,
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

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
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchMatchesBegin());
    axios
      .get('/api/publicmatches', GetRequest)
      .then((res) => {
        dispatch(FetchMatchesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(FetchMatchesFailure(err.error));
      });
  };
};
