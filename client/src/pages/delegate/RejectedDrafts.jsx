import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

/* eslint-disable react/prop-types */
import { FetchRejectedDrafts, FetchRejectedShortlist } from '../../actions/delegate/rejectedDraftsActions';


const mapStateToProps = (state) => ({
  drafts: state.delegate.rejected.rejected,
  draftsLoading: state.delegate.rejected.draftsLoading,
  shortlist: state.delegate.rejected.shortlist,
  shortlistLoading: state.delegate.rejected.shortlistLoading,
  error: state.delegate.rejected.error
});

const mapDispatchToProps = (dispatch) => ({
  DoFetchDrafts: (request) => {
    dispatch(FetchRejectedDrafts(request));
  },
  DoFetchShortlist: (request) => {
    dispatch(FetchRejectedShortlist(request));
  }
});


const RejectedDrafts = (props) => {

  // eslint-disable-next-line no-unused-vars
  const { user, drafts, shortlist, draftsLoading, shortlistLoading, error } = props;

  useEffect(() => {
    const { DoFetchDrafts, DoFetchShortlist } = props;

    if (draftsLoading) {
      DoFetchDrafts({
        username: user,
      });
    }

    if (shortlistLoading) {
      DoFetchShortlist({
        username: user,
      });
    }

  });

  return (
    <>
      {draftsLoading && <Spinner animation="border" />}
      {!draftsLoading && <h1> Salwt rejected drafts </h1>}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RejectedDrafts);

/* eslint-enable react/prop-types */