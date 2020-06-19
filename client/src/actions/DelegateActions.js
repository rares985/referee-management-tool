import {
  FETCH_DELEGABLE_MATCHES_BEGIN,
  FETCH_DELEGABLE_MATCHES_SUCCESS,
  FETCH_DELEGABLE_MATCHES_FAILURE,
  FETCH_ELIGIBLE_REFS_BEGIN,
  FETCH_ELIGIBLE_REFS_SUCCESS,
  FETCH_ELIGIBLE_REFS_FAILURE,
  FETCH_PROPOSED_DRAFTS_BEGIN,
  FETCH_PROPOSED_DRAFTS_SUCCESS,
  FETCH_PROPOSED_DRAFTS_FAILURE,
  FETCH_REJECTED_DRAFTS_BEGIN,
  FETCH_REJECTED_DRAFTS_SUCCESS,
  FETCH_REJECTED_DRAFTS_FAILURE,
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchDelegableMatchesBegin = () => ({
  type: FETCH_DELEGABLE_MATCHES_BEGIN
});

const FetchDelegableMatchesSuccess = (delegableMatches) => ({
  type: FETCH_DELEGABLE_MATCHES_SUCCESS,
  payload: {
    delegableMatches,
  }
});

const FetchDelegableMatchesFailure = (error) => ({
  type: FETCH_DELEGABLE_MATCHES_FAILURE,
  payload: {
    error
  }
});


export const FetchDelegableMatches = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchDelegableMatchesBegin());

    axios.get('/api/delegablematches', GetRequest)
      .then(res => {
        dispatch(FetchDelegableMatchesSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchDelegableMatchesFailure(err.error));
      })
  }
};


/* Fetch eligible Referees */
const FetchEligibleRefsBegin = () => ({
  type: FETCH_ELIGIBLE_REFS_BEGIN
});

const FetchEligibleRefsSuccess = (shortlist) => ({
  type: FETCH_ELIGIBLE_REFS_SUCCESS,
  payload: {
    shortlist,
  }
});

const FetchEligibleRefsFailure = (error) => ({
  type: FETCH_ELIGIBLE_REFS_FAILURE,
  payload: {
    error
  }
});

export const FetchEligibleRefs = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchEligibleRefsBegin());

    axios.get('/api/eligiblefordelegable', GetRequest)
      .then(res => {
        dispatch(FetchEligibleRefsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchEligibleRefsFailure(err.error));
      })
  }
};

const FetchProposedDraftsBegin = () => ({
  type: FETCH_PROPOSED_DRAFTS_BEGIN,
});

const FetchProposedDraftsSuccess = (proposedDrafts) => ({
  type: FETCH_PROPOSED_DRAFTS_SUCCESS,
  payload: {
    proposedDrafts
  }
});

const FetchProposedDraftsFailure = (error) => ({
  type: FETCH_PROPOSED_DRAFTS_FAILURE,
  payload: {
    error
  }
});

export const FetchProposedDrafts = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchProposedDraftsBegin());

    axios
      .get('/api/proposed', GetRequest)
      .then(res => {
        dispatch(FetchProposedDraftsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchProposedDraftsFailure(err.error));
      })
  }
}

const FetchRejectedDraftsBegin = () => ({
  type: FETCH_REJECTED_DRAFTS_BEGIN,
});

const FetchRejectedDraftsSuccess = (rejectedDrafts) => ({
  type: FETCH_REJECTED_DRAFTS_SUCCESS,
  payload: {
    rejectedDrafts
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
      .get('/api/rejected', GetRequest)
      .then(res => {
        dispatch(FetchRejectedDraftsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchRejectedDraftsFailure(err.error));
      })
  }
}