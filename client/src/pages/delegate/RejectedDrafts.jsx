import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import EnhancedTable from '../../components/EnhancedTable';

/* eslint-disable react/prop-types */
import { FetchRejectedDrafts, FetchRejectedShortlist } from '../../actions/delegate/rejectedDraftsActions';
import TableHeaderSelector from '../../components/TableHeaderSelector';
import dateConverter from '../../utils/datemanip';


const mapStateToProps = (state) => ({
  user: state.login.user,
  drafts: state.delegate.rejected.rejected,
  draftsLoading: state.delegate.rejected.rejectedLoading,
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
      {!draftsLoading &&
        <EnhancedTable
          tableName="Propuneri respinse "
          rows={drafts.map(elem => ({
            ...elem, match_date: dateConverter(elem.match_date), a1: '-', a2: '-', obs: '-'
          }))}
          headCells={headCells}
        />
      }
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RejectedDrafts);

/* eslint-enable react/prop-types */