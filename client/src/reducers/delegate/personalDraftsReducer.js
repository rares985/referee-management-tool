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
  UPDATE_DRAFTS_BEGIN,
  UPDATE_DRAFTS_SUCCESS,
  UPDATE_DRAFTS_FAILURE,
} from '../../constants/action-types';

const initialState = {
  drafts: [],
  draftsLoading: true,
  shortlist: [],
  shortlistLoading: true,
};

const personalDraftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONAL_DRAFTS_BEGIN:
      return state;
    case PERSONAL_DRAFTS_SUCCESS:
      return {
        ...state,
        drafts: action.payload.drafts,
        draftsLoading: false,
      };
    case PERSONAL_DRAFTS_FAILURE:
      return {
        ...state,
        draftsLoading: false,
        error: action.payload.error,
      };
    case PERSONAL_DRAFTS_SHORTLIST_BEGIN:
      return state;
    case PERSONAL_DRAFTS_SHORTLIST_SUCCESS:
      return {
        ...state,
        shortlistLoading: false,
        shortlist: action.payload.shortlist,
      };
    case PERSONAL_DRAFTS_SHORTLIST_FAILURE:
      return {
        ...state,
        shortlistLoading: false,
        error: action.payload.error,
      };
    case ADD_DRAFT_BEGIN:
      return {
        ...state,
      };
    case ADD_DRAFT_SUCCESS:
      return {
        ...state,
        draftsLoading: true /* to retrigger matches + shortlist download */,
        shortlistLoading: true,
      };
    case ADD_DRAFT_FAILURE:
      return {
        ...state,
        draftsLoading: false,
      };
    case DELETE_DRAFTS_BEGIN:
      return {
        ...state,
      };
    case DELETE_DRAFTS_SUCCESS:
      return {
        ...state,
        draftsLoading: true /* to retrigger matches + shortlist download */,
        shortlistLoading: true,
      };
    case DELETE_DRAFTS_FAILURE:
      return {
        ...state,
        draftsLoading: false,
      };
    case UPDATE_DRAFTS_BEGIN:
      return {
        ...state,
      };
    case UPDATE_DRAFTS_SUCCESS /* Trigger update of personal drafts table */:
      return {
        ...state,
        draftsLoading: true,
        shortlistLoading: true,
      };
    case UPDATE_DRAFTS_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default personalDraftsReducer;
