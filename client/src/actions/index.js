import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_MATCHES_BEGIN,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE,
  FETCH_DELEGABLE_MATCHES_BEGIN,
  FETCH_DELEGABLE_MATCHES_SUCCESS,
  FETCH_DELEGABLE_MATCHES_FAILURE,
  FETCH_ELIGIBLE_REFS_BEGIN,
  FETCH_ELIGIBLE_REFS_SUCCESS,
  FETCH_ELIGIBLE_REFS_FAILURE,
} from '../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});



const LoginBegin = () => ({
  type: LOGIN_BEGIN,
});

const LoginSuccess = (username) => ({
  type: LOGIN_SUCCESS,
  payload: {
    username
  }
});

const LoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});

export const LoginAction = (request) => {
  return (dispatch) => {
    dispatch(LoginBegin());
    axios
      .post('/api/authenticate', request)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        dispatch(LoginSuccess(request.username));
      })
      .catch((err) => {
        dispatch(LoginFailure(err.error));
      });
  };
};


const FetchMatchesBegin = () => ({
  type: FETCH_MATCHES_BEGIN,
});

const FetchMatchesSuccess = (matches) => ({
  type: FETCH_MATCHES_SUCCESS,
  payload: {
    matches,
  },
});

const FetchMatchesFailure = (error) => ({
  type: FETCH_MATCHES_FAILURE,
  payload: {
    error,
  },
});

// eslint-disable-next-line import/prefer-default-export
export const FetchMatches = (request) => {
  return (dispatch) => {
    dispatch(FetchMatchesBegin());
    axios
      .get('/api/publicmatches', request)
      .then((res) => {
        dispatch(FetchMatchesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(FetchMatchesFailure(err.error));
      });
  };
};




/* Fetch eligible Referees */
const FetchEligibleRefsBegin = () => ({
  type: FETCH_ELIGIBLE_REFS_BEGIN
});

const FetchEligibleRefsSuccess = (shortlist) => ({
  type: FETCH_ELIGIBLE_REFS_SUCCESS,
  payload: {
    shortlist,
  }
});

const FetchEligibleRefsFailure = (error) => ({
  type: FETCH_ELIGIBLE_REFS_FAILURE,
  payload: {
    error
  }
});

export const FetchEligibleRefs = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchEligibleRefsBegin());

    axios.get('/api/eligiblefordelegable', GetRequest)
      .then(res => {
        console.log('eligiblefordelegable');
        console.log(res);
        console.log(res.data);
        dispatch(FetchEligibleRefsSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchEligibleRefsFailure(err.error));
      })
  }
};

/* Fetch delegable matches */
const FetchDelegableMatchesBegin = () => ({
  type: FETCH_DELEGABLE_MATCHES_BEGIN
});

const FetchDelegableMatchesSuccess = (matches) => ({
  type: FETCH_DELEGABLE_MATCHES_SUCCESS,
  payload: {
    matches,
  }
});

const FetchDelegableMatchesFailure = (error) => ({
  type: FETCH_DELEGABLE_MATCHES_FAILURE,
  payload: {
    error
  }
});


export const FetchDelegableMatches = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchDelegableMatchesBegin());

    axios.get('/api/delegablematches', GetRequest)
      .then(res => {
        console.log('FetchDelegable');
        console.log(res);
        console.log(res.data);
        dispatch(FetchDelegableMatchesSuccess(res.data));
      })
      .catch(err => {
        dispatch(FetchDelegableMatchesFailure(err.error));
      })
  }
};