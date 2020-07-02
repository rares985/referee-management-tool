import {
  PROPOSED_DRAFTS_BEGIN,
  PROPOSED_DRAFTS_SUCCESS,
  PROPOSED_DRAFTS_FAILURE,
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

export default (request) => {
  const GetRequest = { params: request };
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