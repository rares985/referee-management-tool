import {
  FETCH_UNAVAILABILITY_PERIODS_BEGIN,
  FETCH_UNAVAILABILITY_PERIODS_SUCCESS,
  FETCH_UNAVAILABILITY_PERIODS_FAILURE
} from '../constants/action-types';


const initialState = {
  confirmedDates: [],
  loading: true,
  error: null
};

const unavailabilityPeriodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNAVAILABILITY_PERIODS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_UNAVAILABILITY_PERIODS_SUCCESS:
      return {
        ...state,
        info: action.payload.dates,
        loading: false,
        error: null
      };
    case FETCH_UNAVAILABILITY_PERIODS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default unavailabilityPeriodsReducer;