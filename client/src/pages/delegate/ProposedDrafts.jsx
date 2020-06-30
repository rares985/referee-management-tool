import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* eslint-disable react/prop-types */
import { CircularProgress } from '@material-ui/core';
import { FetchProposedDrafts, FetchProposedShortlist } from '../../actions/delegate/proposedDraftsActions';
import TableHeaderSelector from '../../components/TableHeaderSelector';

import EnhancedTable from '../../components/EnhancedTable';
import dateConverter from '../../utils/datemanip';


const mapStateToProps = (state) => ({
  user: state.login.user,
  drafts: state.delegate.proposed.proposed,
  draftsLoading: state.delegate.proposed.proposedLoading,
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

  const headCells = [
    { id: 'match_no', numeric: true, disablePadding: true, label: 'Număr meci' },
    { id: 'match_date', numeric: false, disablePadding: false, label: 'Data desfășurării' },
    { id: 'team_a_name', numeric: false, disablePadding: false, label: 'Echipa A' },
    { id: 'team_b_name', numeric: false, disablePadding: false, label: 'Echipa B' },
    { id: 'full_name_competition', numeric: false, disablePadding: false, label: 'Competiție' },
    { id: 'a1', numeric: false, disablePadding: false, label: 'A1' },
    { id: 'a2', numeric: false, disablePadding: false, label: 'A2' },
    { id: 'obs', numeric: false, disablePadding: false, label: 'Observator' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Locație' },
  ];

  return (
    <>
      {draftsLoading && <CircularProgress />}
      <TableHeaderSelector />
      {!draftsLoading && <EnhancedTable
        tableName="Propuse pentru aprobare "
        rows={drafts.map(elem => ({ ...elem, match_date: dateConverter(elem.match_date), a1: '-', a2: '-', obs: '-' }))}
        headCells={headCells}
      />}
    </>
  );
};

/* eslint-enable react/prop-types */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposedDrafts);