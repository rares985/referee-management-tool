import {
  FETCH_OLD_UNAVAILABILITIES_BEGIN,
  FETCH_OLD_UNAVAILABILITIES_SUCCESS,
  FETCH_OLD_UNAVAILABILITIES_FAILURE,
  FETCH_UPCOMING_UNAVAILABILITIES_BEGIN,
  FETCH_UPCOMING_UNAVAILABILITIES_SUCCESS,
  FETCH_UPCOMING_UNAVAILABILITIES_FAILURE,
  DELETE_UPCOMING_BEGIN,
  DELETE_UPCOMING_SUCCESS,
  DELETE_UPCOMING_FAILURE,
  ADD_NEW_UNAVAILABILITY_BEGIN,
  ADD_NEW_UNAVAILABILITY_SUCCESS,
  ADD_NEW_UNAVAILABILITY_FAILURE,
} from '../constants/action-types';

const initialState = {
  oldDates: [],
  oldLoading: true,
  upcomingDates: [],
  upcomingLoading: false,
  updateFinished: false,
  error: null,
};

const unavailabilityPeriodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OLD_UNAVAILABILITIES_BEGIN:
      return {
        ...state,
        oldLoading: true,
        error: null,
      };
    case FETCH_OLD_UNAVAILABILITIES_SUCCESS:
      return {
        ...state,
        oldDates: action.payload.periods,
        oldLoading: false,
        upcomingLoading: true,
        error: null,
      };
    case FETCH_OLD_UNAVAILABILITIES_FAILURE:
      return {
        ...state,
        oldLoading: false,
        error: action.payload.error,
      };
    case FETCH_UPCOMING_UNAVAILABILITIES_BEGIN:
      return {
        ...state,
        upcomingLoading: true,
        error: null,
      };
    case FETCH_UPCOMING_UNAVAILABILITIES_SUCCESS:
      return {
        ...state,
        upcomingDates: action.payload.periods,
        upcomingLoading: false,
        error: null,
      };
    case FETCH_UPCOMING_UNAVAILABILITIES_FAILURE:
      return {
        ...state,
        upcomingLoading: false,
        error: action.payload.error,
      };
    case ADD_NEW_UNAVAILABILITY_BEGIN:
      return {
        ...state,
      };
    case ADD_NEW_UNAVAILABILITY_SUCCESS:
      return {
        ...state,
        upcomingLoading: true,
      };
    case ADD_NEW_UNAVAILABILITY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case DELETE_UPCOMING_BEGIN:
      return {
        ...state,
        upcomingLoading: true /* To trigger the download of the new ones */,
      };
    case DELETE_UPCOMING_SUCCESS:
      return {
        ...state,
      };
    case DELETE_UPCOMING_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default unavailabilityPeriodsReducer;
