import {
  FETCH_UNAVAILABILITY_PERIODS_BEGIN,
  FETCH_UNAVAILABILITY_PERIODS_SUCCESS,
  FETCH_UNAVAILABILITY_PERIODS_FAILURE
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const FetchUnavailabilityPeriodsBegin = () => ({
  type: FETCH_UNAVAILABILITY_PERIODS_BEGIN
});

const FetchUnavailabilityPeriodsSuccess = (rights) => ({
  type: FETCH_UNAVAILABILITY_PERIODS_SUCCESS,
  payload: {
    rights,
  }
});

const FetchUnavailabilityPeriodsFailure = (error) => ({
  type: FETCH_UNAVAILABILITY_PERIODS_FAILURE,
  payload: {
    error
  }
});


const FetchUnavailabilityPeriods = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchUnavailabilityPeriodsBegin());

    axios.get('/api/unavailabilityPeriods', GetRequest)
      .then(res => {
        dispatch(FetchUnavailabilityPeriodsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchUnavailabilityPeriodsFailure(err.error));
      })
  }
};

export default FetchUnavailabilityPeriods;