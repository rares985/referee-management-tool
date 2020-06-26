import {
  FETCH_PERSONAL_INFO_BEGIN,
  FETCH_PERSONAL_INFO_SUCCESS,
  FETCH_PERSONAL_INFO_FAILURE,
  UPDATE_PERSONAL_INFO_BEGIN,
  UPDATE_PERSONAL_INFO_SUCCESS,
  UPDATE_PERSONAL_INFO_FAILURE
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

export const FetchPersonalInfo = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(PersonalInfoBegin());
    axios
      .get('/api/personal', GetRequest)
      .then((res) => {
        dispatch(PersonalInfoSuccess(res.data));
      })
      .catch((err) => {
        dispatch(PersonalInfoFailure(err.error));
      });
  };
};

const UpdatePersonalInfoBegin = () => ({
  type: UPDATE_PERSONAL_INFO_BEGIN
});

const UpdatePersonalInfoSuccess = (info) => ({
  type: UPDATE_PERSONAL_INFO_SUCCESS,
  payload: {
    info
  }
});

const UpdatePersonalInfoFailure = (error) => ({
  type: UPDATE_PERSONAL_INFO_FAILURE,
  payload: {
    error
  }
});

export const UpdatePersonalInfo = (request) => {
  return (dispatch) => {
    dispatch(UpdatePersonalInfoBegin());
    axios
      .post('/api/personal', request)
      .then(res => {
        dispatch(UpdatePersonalInfoSuccess(res));
      })
      .catch(err => {
        dispatch(UpdatePersonalInfoFailure(err.error));
      })
  }
}