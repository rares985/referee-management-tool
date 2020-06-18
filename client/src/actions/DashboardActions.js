import {
  FETCH_USER_RIGHTS_BEGIN,
  FETCH_USER_RIGHTS_SUCCESS,
  FETCH_USER_RIGHTS_FAILURE
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchUserRightsBegin = () => ({
  type: FETCH_USER_RIGHTS_BEGIN
});

const FetchUserRightsSuccess = (rights) => ({
  type: FETCH_USER_RIGHTS_SUCCESS,
  payload: {
    rights,
  }
});

const FetchUserRightsFailure = (error) => ({
  type: FETCH_USER_RIGHTS_FAILURE,
  payload: {
    error
  }
});


const FetchUserRights = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchUserRightsBegin());

    axios.get('/api/userinfo', GetRequest)
      .then(res => {
        dispatch(FetchUserRightsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchUserRightsFailure(err.error));
      })
  }
};

export default FetchUserRights;