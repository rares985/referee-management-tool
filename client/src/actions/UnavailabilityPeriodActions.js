import {
  FETCH_OLD_UNAVAILABILITIES_BEGIN,
  FETCH_OLD_UNAVAILABILITIES_SUCCESS,
  FETCH_OLD_UNAVAILABILITIES_FAILURE,
  FETCH_UPCOMING_UNAVAILABILITIES_BEGIN,
  FETCH_UPCOMING_UNAVAILABILITIES_SUCCESS,
  FETCH_UPCOMING_UNAVAILABILITIES_FAILURE,
  ADD_NEW_UNAVAILABILITY_BEGIN,
  ADD_NEW_UNAVAILABILITY_SUCCESS,
  ADD_NEW_UNAVAILABILITY_FAILURE,
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchOldUnavailabilitiesBegin = () => ({
  type: FETCH_OLD_UNAVAILABILITIES_BEGIN,
});
const FetchOldUnavailabilitiesSuccess = (periods) => ({
  type: FETCH_OLD_UNAVAILABILITIES_SUCCESS,
  payload: {
    periods,
  }
});
const FetchOldUnavailabilitiesFailure = (error) => ({
  type: FETCH_OLD_UNAVAILABILITIES_FAILURE,
  payload: {
    error
  }
});
export const FetchOldUnavailabilities = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchOldUnavailabilitiesBegin());

    axios.get('/api/unavailable/personal/old', GetRequest)
      .then(res => {
        dispatch(FetchOldUnavailabilitiesSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchOldUnavailabilitiesFailure(err.error));
      })
  }
};

const FetchUpcomingUnavailabilitiesBegin = () => ({
  type: FETCH_UPCOMING_UNAVAILABILITIES_BEGIN
});

const FetchUpcomingUnavailabilitiesSuccess = (periods) => ({
  type: FETCH_UPCOMING_UNAVAILABILITIES_SUCCESS,
  payload: {
    periods,
  }
});

const FetchUpcomingUnavailabilitiesFailure = (error) => ({
  type: FETCH_UPCOMING_UNAVAILABILITIES_FAILURE,
  payload: {
    error
  }
});


export const FetchUpcomingUnavailabilities = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchUpcomingUnavailabilitiesBegin());

    axios.get('/api/unavailable/personal/upcoming', GetRequest)
      .then(res => {
        dispatch(FetchUpcomingUnavailabilitiesSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchUpcomingUnavailabilitiesFailure(err.error));
      })
  }
};

const AddNewUnavailabilityBegin = () => ({
  type: ADD_NEW_UNAVAILABILITY_BEGIN
});

const AddNewUnavailabilitySuccess = () => ({
  type: ADD_NEW_UNAVAILABILITY_SUCCESS,
});

const AddNewUnavailabilityFailure = (error) => ({
  type: ADD_NEW_UNAVAILABILITY_FAILURE,
  payload: {
    error,
  }
});

export const AddNewUnavailability = (request) => {
  return (dispatch) => {
    dispatch(AddNewUnavailabilityBegin());

    axios.post('/api/unavailable/', request)
      .then(res => {
        dispatch(AddNewUnavailabilitySuccess(res.data));
      })
      .catch(err => {
        dispatch(AddNewUnavailabilityFailure(err.error));
      })
  }
}