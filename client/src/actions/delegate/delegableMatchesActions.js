import {
  FETCH_DELEGABLE_MATCHES_BEGIN,
  FETCH_DELEGABLE_MATCHES_SUCCESS,
  FETCH_DELEGABLE_MATCHES_FAILURE,
  FETCH_ELIGIBLE_REFS_BEGIN,
  FETCH_ELIGIBLE_REFS_SUCCESS,
  FETCH_ELIGIBLE_REFS_FAILURE,
} from '../../constants/action-types';

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




