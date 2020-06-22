import {
  FETCH_PERSONAL_DRAFTS_BEGIN,
  FETCH_PERSONAL_DRAFTS_SUCCESS,
  FETCH_PERSONAL_DRAFTS_FAILURE
} from '../../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchPersonalDraftsBegin = () => ({
  type: FETCH_PERSONAL_DRAFTS_BEGIN,
});

const FetchPersonalDraftsSuccess = (drafts) => ({
  type: FETCH_PERSONAL_DRAFTS_SUCCESS,
  payload: {
    drafts
  }
});

const FetchPersonalDraftsFailure = (error) => ({
  type: FETCH_PERSONAL_DRAFTS_FAILURE,
  payload: {
    error
  }
});

// eslint-disable-next-line import/prefer-default-export
export const FetchPersonalDrafts = (request) => {
  const GetRequest = { params: request };
  console.log(GetRequest);
  return (dispatch) => {
    dispatch(FetchPersonalDraftsBegin());

    axios
      .get('/api/delegate/drafts/matches', GetRequest)
      .then(res => {
        console.log(res);
        console.log(res.data);
        dispatch(FetchPersonalDraftsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchPersonalDraftsFailure(err.error));
      })
  }
};