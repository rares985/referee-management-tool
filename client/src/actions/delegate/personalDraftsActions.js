import {
  PERSONAL_DRAFTS_BEGIN,
  PERSONAL_DRAFTS_SUCCESS,
  PERSONAL_DRAFTS_FAILURE,
  PERSONAL_DRAFTS_SHORTLIST_BEGIN,
  PERSONAL_DRAFTS_SHORTLIST_SUCCESS,
  PERSONAL_DRAFTS_SHORTLIST_FAILURE,
  ADD_DRAFT_BEGIN,
  ADD_DRAFT_SUCCESS,
  ADD_DRAFT_FAILURE,
  DELETE_DRAFTS_BEGIN,
  DELETE_DRAFTS_SUCCESS,
  DELETE_DRAFTS_FAILURE,
} from '../../constants/action-types';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT,
});

const FetchPersonalDraftsBegin = () => ({
  type: PERSONAL_DRAFTS_BEGIN,
});

const FetchPersonalDraftsSuccess = (drafts) => ({
  type: PERSONAL_DRAFTS_SUCCESS,
  payload: {
    drafts,
  },
});

const FetchPersonalDraftsFailure = (error) => ({
  type: PERSONAL_DRAFTS_FAILURE,
  payload: {
    error,
  },
});

export const FetchPersonalDrafts = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchPersonalDraftsBegin());

    axios
      .get('/api/delegate/drafts/matches', GetRequest)
      .then((res) => {
        dispatch(FetchPersonalDraftsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(FetchPersonalDraftsFailure(err.error));
      });
  };
};

const FetchPersonalDraftsShortlistBegin = () => ({
  type: PERSONAL_DRAFTS_SHORTLIST_BEGIN,
});

const FetchPersonalDraftsShortlistSuccess = (shortlist) => ({
  type: PERSONAL_DRAFTS_SHORTLIST_SUCCESS,
  payload: {
    shortlist,
  },
});

const FetchPersonalDraftsShortlistFailure = (error) => ({
  type: PERSONAL_DRAFTS_SHORTLIST_FAILURE,
  payload: {
    error,
  },
});

export const FetchPersonalDraftsShortlist = (request) => {
  const GetRequest = { params: request };
  return (dispatch) => {
    dispatch(FetchPersonalDraftsShortlistBegin());

    axios
      .get('/api/delegate/drafts/shortlist', GetRequest)
      .then((res) => {
        dispatch(FetchPersonalDraftsShortlistSuccess(res.data));
      })
      .catch((err) => {
        dispatch(FetchPersonalDraftsShortlistFailure(err.error));
      });
  };
};

const AddDraftBegin = () => ({
  type: ADD_DRAFT_BEGIN,
});

const AddDraftSuccess = (data) => ({
  type: ADD_DRAFT_SUCCESS,
  payload: {
    data,
  },
});

const AddDraftFailure = (error) => ({
  type: ADD_DRAFT_FAILURE,
  payload: {
    error,
  },
});

export const AddDraft = (request) => {
  return (dispatch) => {
    dispatch(AddDraftBegin());

    axios
      .post('/api/delegate/drafts/matches', request)
      .then((res) => {
        dispatch(AddDraftSuccess(res.data));
      })
      .catch((err) => {
        dispatch(AddDraftFailure(err.error));
      });
  };
};

export const DeleteDraftsBegin = () => ({
  type: DELETE_DRAFTS_BEGIN,
});

export const DeleteDraftsSuccess = () => ({
  type: DELETE_DRAFTS_SUCCESS,
});

export const DeleteDraftsFailure = (error) => ({
  type: DELETE_DRAFTS_FAILURE,
  payload: {
    error,
  },
});

export const DeleteDrafts = (request) => {
  const DeleteRequest = {
    data: request,
  };
  return (dispatch) => {
    dispatch(DeleteDraftsBegin());

    axios
      .delete('/api/delegate/drafts/matches', DeleteRequest)
      .then(() => {
        dispatch(DeleteDraftsSuccess());
      })
      .catch((err) => {
        dispatch(DeleteDraftsFailure(err.error));
      });
  };
};
