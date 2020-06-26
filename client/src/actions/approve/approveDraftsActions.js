import {
  APPROVABLE_DRAFTS_BEGIN,
  APPROVABLE_DRAFTS_SUCCESS,
  APPROVABLE_DRAFTS_FAILURE,
} from '../../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchApprovableDraftsBegin = () => ({
  type: APPROVABLE_DRAFTS_BEGIN
});

const FetchApprovableDraftsSuccess = (drafts) => ({
  type: APPROVABLE_DRAFTS_SUCCESS,
  payload: {
    drafts,
  }
});

const FetchApprovableDraftsFailure = (error) => ({
  type: APPROVABLE_DRAFTS_FAILURE,
  payload: {
    error
  }
});


const FetchApprovableDrafts = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchApprovableDraftsBegin());

    axios.get('/api/approve/drafts/proposed', GetRequest)
      .then(res => {
        console.log(res);
        console.log(res.data);
        dispatch(FetchApprovableDraftsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchApprovableDraftsFailure(err.error));
      })
  }
};

export default FetchApprovableDrafts;