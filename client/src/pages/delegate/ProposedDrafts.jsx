import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CircularProgress } from '@material-ui/core';
import FetchProposedDrafts from '../../actions/delegate/proposedDraftsActions';
import TableHeaderSelector from '../../components/TableHeaderSelector';

import EnhancedTable from '../../components/EnhancedTable';
import dateConverter from '../../utils/datemanip';

const mapStateToProps = (state) => ({
  user: state.login.user,
  drafts: state.delegate.proposed.proposed,
  draftsLoading: state.delegate.proposed.proposedLoading,
  error: state.delegate.proposed.error,
});

const mapDispatchToProps = (dispatch) => ({
  DoFetchDrafts: (request) => {
    dispatch(FetchProposedDrafts(request));
  },
});

const ProposedDrafts = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { user, drafts, draftsLoading, error } = props;

  useEffect(() => {
    const { DoFetchDrafts } = props;

    if (draftsLoading) {
      DoFetchDrafts({
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
      {!draftsLoading && (
        <EnhancedTable
          tableName="Propuse pentru aprobare "
          rows={drafts.map((elem) => ({
            ...elem,
            match_date: dateConverter(elem.match_date),
            a1: '-',
            a2: '-',
            obs: '-',
          }))}
          headCells={headCells}
        />
      )}
    </>
  );
};

ProposedDrafts.propTypes = {
  user: PropTypes.string.isRequired,
  drafts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      draft_id: PropTypes.number.isRequired,
      match_no: PropTypes.number.isRequired,
      match_date: PropTypes.string.isRequired,
      team_a_name: PropTypes.string.isRequired,
      team_b_name: PropTypes.string.isRequired,
      competition_full_name: PropTypes.string.isRequired,
      first_referee: PropTypes.string.isRequired,
      second_referee: PropTypes.string.isRequired,
      observer: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
  draftsLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  DoFetchDrafts: PropTypes.func.isRequired,
};

ProposedDrafts.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposedDrafts);
