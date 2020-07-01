import {
  PERSONAL_DRAFTS_BEGIN,
  PERSONAL_DRAFTS_SUCCESS,
  PERSONAL_DRAFTS_FAILURE
} from '../../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchPersonalDraftsBegin = () => ({
  type: PERSONAL_DRAFTS_BEGIN,
});

const FetchPersonalDraftsSuccess = (drafts) => ({
  type: PERSONAL_DRAFTS_SUCCESS,
  payload: {
    drafts
  }
});

const FetchPersonalDraftsFailure = (error) => ({
  type: PERSONAL_DRAFTS_FAILURE,
  payload: {
    error
  }
});

// eslint-disable-next-line import/prefer-default-export
export const FetchPersonalDrafts = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchPersonalDraftsBegin());

    axios
      .get('/api/delegate/drafts/matches', GetRequest)
      .then(res => {
        dispatch(FetchPersonalDraftsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchPersonalDraftsFailure(err.error));
      })
  }
};