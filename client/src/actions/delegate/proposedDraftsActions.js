import {
  PROPOSED_DRAFTS_BEGIN,
  PROPOSED_DRAFTS_SUCCESS,
  PROPOSED_DRAFTS_FAILURE,
  FETCH_PROPOSED_SHORTLIST_BEGIN,
  FETCH_PROPOSED_SHORTLIST_SUCCESS,
  FETCH_PROPOSED_SHORTLIST_FAILURE,
} from '../../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchProposedDraftsBegin = () => ({
  type: PROPOSED_DRAFTS_BEGIN,
});

const FetchProposedDraftsSuccess = (proposed) => ({
  type: PROPOSED_DRAFTS_SUCCESS,
  payload: {
    proposed
  }
});

const FetchProposedDraftsFailure = (error) => ({
  type: PROPOSED_DRAFTS_FAILURE,
  payload: {
    error
  }
});

export const FetchProposedDrafts = (request) => {
  const GetRequest = { params: request };
  console.log(`Dispatching ${GetRequest}`);
  return (dispatch) => {
    dispatch(FetchProposedDraftsBegin());

    axios
      .get('/api/delegate/proposed/matches', GetRequest)
      .then(res => {
        dispatch(FetchProposedDraftsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchProposedDraftsFailure(err.error));
      })
  }
}



const FetchProposedShortlistBegin = () => ({
  type: FETCH_PROPOSED_SHORTLIST_BEGIN,
});

const FetchProposedShortlistSuccess = (proposedDrafts) => ({
  type: FETCH_PROPOSED_SHORTLIST_SUCCESS,
  payload: {
    proposedDrafts
  }
});

const FetchProposedShortlistFailure = (error) => ({
  type: FETCH_PROPOSED_SHORTLIST_FAILURE,
  payload: {
    error
  }
});

export const FetchProposedShortlist = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchProposedShortlistBegin());

    axios
      .get('/api/delegate/proposed/shortlist', GetRequest)
      .then(res => {
        dispatch(FetchProposedShortlistSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchProposedShortlistFailure(err.error));
      })
  }
}