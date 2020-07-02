import {
  REJECTED_DRAFTS_BEGIN,
  REJECTED_DRAFTS_SUCCESS,
  REJECTED_DRAFTS_FAILURE,
  REJECTED_SHORTLIST_BEGIN,
  REJECTED_SHORTLIST_SUCCESS,
  REJECTED_SHORTLIST_FAILURE
} from '../../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchRejectedDraftsBegin = () => ({
  type: REJECTED_DRAFTS_BEGIN,
});

const FetchRejectedDraftsSuccess = (rejected) => ({
  type: REJECTED_DRAFTS_SUCCESS,
  payload: {
    rejected
  }
});

const FetchRejectedDraftsFailure = (error) => ({
  type: REJECTED_DRAFTS_FAILURE,
  payload: {
    error
  }
});

export const FetchRejectedDrafts = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchRejectedDraftsBegin());

    axios
      .get('/api/delegate/rejected/matches', GetRequest)
      .then(res => {
        dispatch(FetchRejectedDraftsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchRejectedDraftsFailure(err.error));
      })
  }
}

const FetchRejectedShortlistBegin = () => ({
  type: REJECTED_SHORTLIST_BEGIN,
});

const FetchRejectedShortlistSuccess = (shortlist) => ({
  type: REJECTED_SHORTLIST_SUCCESS,
  payload: {
    shortlist
  }
});

const FetchRejectedShortlistFailure = (error) => ({
  type: REJECTED_SHORTLIST_FAILURE,
  payload: {
    error
  }
});

export const FetchRejectedShortlist = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchRejectedShortlistBegin());

    axios
      .get('/api/delegate/rejected/shortlist', GetRequest)
      .then(res => {
        dispatch(FetchRejectedShortlistSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchRejectedShortlistFailure(err.error));
      })
  }
}