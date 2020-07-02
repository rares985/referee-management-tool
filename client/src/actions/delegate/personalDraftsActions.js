import {
  PERSONAL_DRAFTS_BEGIN,
  PERSONAL_DRAFTS_SUCCESS,
  PERSONAL_DRAFTS_FAILURE,
  PERSONAL_DRAFTS_SHORTLIST_BEGIN,
  PERSONAL_DRAFTS_SHORTLIST_SUCCESS,
  PERSONAL_DRAFTS_SHORTLIST_FAILURE
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

const FetchPersonalDraftsShortlistBegin = () => ({
  type: PERSONAL_DRAFTS_SHORTLIST_BEGIN,
})

const FetchPersonalDraftsShortlistSuccess = (shortlist) => ({
  type: PERSONAL_DRAFTS_SHORTLIST_SUCCESS,
  payload: {
    shortlist
  }
})

const FetchPersonalDraftsShortlistFailure = (error) => ({
  type: PERSONAL_DRAFTS_SHORTLIST_FAILURE,
  payload: {
    error
  }
})

export const FetchPersonalDraftsShortlist = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchPersonalDraftsShortlistBegin());

    axios
      .get('/api/delegate/drafts/shortlist', GetRequest)
      .then(res => {
        dispatch(FetchPersonalDraftsShortlistSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchPersonalDraftsShortlistFailure(err.error));
      })
  }
}