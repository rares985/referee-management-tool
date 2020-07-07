import {
  DELEGABLE_MATCHES_BEGIN,
  DELEGABLE_MATCHES_SUCCESS,
  DELEGABLE_MATCHES_FAILURE,
  ELIGIBLE_REFS_BEGIN,
  ELIGIBLE_REFS_SUCCESS,
  ELIGIBLE_REFS_FAILURE,
} from '../../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT,
});

const FetchDelegableMatchesBegin = () => ({
  type: DELEGABLE_MATCHES_BEGIN,
});

const FetchDelegableMatchesSuccess = (matches) => ({
  type: DELEGABLE_MATCHES_SUCCESS,
  payload: {
    matches,
  },
});

const FetchDelegableMatchesFailure = (error) => ({
  type: DELEGABLE_MATCHES_FAILURE,
  payload: {
    error,
  },
});

export const FetchDelegableMatches = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchDelegableMatchesBegin());

    axios
      .get('/api/delegate/delegable/matches', GetRequest)
      .then((res) => {
        dispatch(FetchDelegableMatchesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(FetchDelegableMatchesFailure(err.error));
      });
  };
};

/* Fetch eligible Referees */
const FetchEligibleRefsBegin = () => ({
  type: ELIGIBLE_REFS_BEGIN,
});

const FetchEligibleRefsSuccess = (shortlist) => ({
  type: ELIGIBLE_REFS_SUCCESS,
  payload: {
    shortlist,
  },
});

const FetchEligibleRefsFailure = (error) => ({
  type: ELIGIBLE_REFS_FAILURE,
  payload: {
    error,
  },
});

export const FetchEligibleRefs = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchEligibleRefsBegin());

    axios
      .get('/api/delegate/delegable/shortlist', GetRequest)
      .then((res) => {
        dispatch(FetchEligibleRefsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(FetchEligibleRefsFailure(err.error));
      });
  };
};
