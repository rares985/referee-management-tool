import {
  PERSONAL_MATCH_HISTORY_BEGIN,
  PERSONAL_MATCH_HISTORY_SUCCESS,
  PERSONAL_MATCH_HISTORY_FAILURE,
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});


const FetchPersonalMatchHistoryBegin = () => ({
  type: PERSONAL_MATCH_HISTORY_BEGIN,
});

const FetchPersonalMatchHistorySuccess = (matches) => ({
  type: PERSONAL_MATCH_HISTORY_SUCCESS,
  payload: {
    matches
  }
});

const FetchPersonalMatchHistoryFailure = (error) => ({
  type: PERSONAL_MATCH_HISTORY_FAILURE,
  payload: {
    error
  }
});

const FetchPersonalMatchHistory = (request) => {
  return (dispatch) => {
    dispatch(FetchPersonalMatchHistoryBegin());
    axios
      .post('/api/personal/history', request)
      .then((res) => {
        dispatch(FetchPersonalMatchHistorySuccess(res.data));
      })
      .catch((err) => {
        dispatch(FetchPersonalMatchHistoryFailure(err.error));
      });
  };
};

export default FetchPersonalMatchHistory;