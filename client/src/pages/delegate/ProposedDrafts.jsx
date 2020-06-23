import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

/* eslint-disable react/prop-types */
import { FetchProposedDrafts, FetchProposedShortlist } from '../../actions/delegate/proposedDraftsActions';


const mapStateToProps = (state) => ({
  user: state.login.user,
  drafts: state.delegate.proposed.proposed,
  draftsLoading: state.delegate.proposed.draftsLoading,
  shortlist: state.delegate.proposed.shortlist,
  shortlistLoading: state.delegate.proposed.shortlistLoading,
  error: state.delegate.proposed.error
});

const mapDispatchToProps = (dispatch) => ({
  DoFetchDrafts: (request) => {
    dispatch(FetchProposedDrafts(request));
  },
  DoFetchShortlist: (request) => {
    dispatch(FetchProposedShortlist(request));
  }
});


const ProposedDrafts = (props) => {

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
      {!draftsLoading && <h1> Salwt proposed drafts </h1>}
    </>
  );
};
/* eslint-enable react/prop-types */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposedDrafts);