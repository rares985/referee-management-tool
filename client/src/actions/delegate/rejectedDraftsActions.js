import {
  FETCH_REJECTED_DRAFTS_BEGIN,
  FETCH_REJECTED_DRAFTS_SUCCESS,
  FETCH_REJECTED_DRAFTS_FAILURE,
  FETCH_REJECTED_SHORTLIST_BEGIN,
  FETCH_REJECTED_SHORTLIST_SUCCESS,
  FETCH_REJECTED_SHORTLIST_FAILURE
} from '../../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchRejectedDraftsBegin = () => ({
  type: FETCH_REJECTED_DRAFTS_BEGIN,
});

const FetchRejectedDraftsSuccess = (rejected) => ({
  type: FETCH_REJECTED_DRAFTS_SUCCESS,
  payload: {
    rejected
  }
});

const FetchRejectedDraftsFailure = (error) => ({
  type: FETCH_REJECTED_DRAFTS_FAILURE,
  payload: {
    error
  }
});

export const FetchRejectedDrafts = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchRejectedDraftsBegin());

    axios
      .get('/api/rejected/matches', GetRequest)
      .then(res => {
        dispatch(FetchRejectedDraftsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchRejectedDraftsFailure(err.error));
      })
  }
}

const FetchRejectedShortlistBegin = () => ({
  type: FETCH_REJECTED_SHORTLIST_BEGIN,
});

const FetchRejectedShortlistSuccess = (shortlist) => ({
  type: FETCH_REJECTED_SHORTLIST_SUCCESS,
  payload: {
    shortlist
  }
});

const FetchRejectedShortlistFailure = (error) => ({
  type: FETCH_REJECTED_SHORTLIST_FAILURE,
  payload: {
    error
  }
});

export const FetchRejectedShortlist = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchRejectedShortlistBegin());

    axios
      .get('/api/rejected/shortlist', GetRequest)
      .then(res => {
        dispatch(FetchRejectedShortlistSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchRejectedShortlistFailure(err.error));
      })
  }
}