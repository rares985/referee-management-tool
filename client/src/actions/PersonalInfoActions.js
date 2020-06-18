import {
  FETCH_PERSONAL_INFO_BEGIN,
  FETCH_PERSONAL_INFO_SUCCESS,
  FETCH_PERSONAL_INFO_FAILURE,
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});


const PersonalInfoBegin = () => ({
  type: FETCH_PERSONAL_INFO_BEGIN,
});

const PersonalInfoSuccess = (info) => ({
  type: FETCH_PERSONAL_INFO_SUCCESS,
  payload: {
    info
  }
});

const PersonalInfoFailure = (error) => ({
  type: FETCH_PERSONAL_INFO_FAILURE,
  payload: {
    error
  }
});

const FetchPersonalInfo = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    console.log('Yess');
    dispatch(PersonalInfoBegin());
    axios
      .get('/api/personalInfo', GetRequest)
      .then((res) => {
        dispatch(PersonalInfoSuccess(res.data));
      })
      .catch((err) => {
        dispatch(PersonalInfoFailure(err.error));
      });
  };
};

export default FetchPersonalInfo;