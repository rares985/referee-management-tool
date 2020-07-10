import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CircularProgress } from '@material-ui/core';
import FetchProposedDrafts from '../../actions/delegate/proposedDraftsActions';
import NiceTable from '../../components/NiceTable';

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
    { id: 'match_no', numeric: true, disablePadding: false, label: 'Număr meci' },
    { id: 'match_date', numeric: false, disablePadding: false, label: 'Data desfășurării' },
    { id: 'team_a_name', numeric: false, disablePadding: false, label: 'Echipa A' },
    { id: 'team_b_name', numeric: false, disablePadding: false, label: 'Echipa B' },
    { id: 'competition_name', numeric: false, disablePadding: false, label: 'Competiție' },
    {
      id: 'first_referee',
      numeric: false,
      disablePadding: false,
      label: 'Primul arbitru (A1)',
    },
    {
      id: 'second_referee',
      numeric: false,
      disablePadding: false,
      label: 'Arbitru secund (A2) ',
    },
    { id: 'observer', numeric: false, disablePadding: false, label: 'Observator' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Locație' },
  ];

  return (
    <>
      {draftsLoading && <CircularProgress />}
      {!draftsLoading && (
        <NiceTable
          tableName="Propuse spre aprobare"
          primaryKey="draft_id"
          headCells={headCells}
          rows={drafts.map((elem) => ({
            ...elem,
            match_date: dateConverter(elem.match_date),
            first_referee: 'Arbitru nedelegat',
            second_referee: 'Arbitru nedelegat',
            observer: 'Arbitru nedelegat',
          }))}
        />
      )}
    </>
  );
};

ProposedDrafts.propTypes = {
  user: PropTypes.string.isRequired,
  drafts: PropTypes.arrayOf(
    PropTypes.exact({
      proposed_draft_id: PropTypes.number.isRequired,
      draft_id: PropTypes.number.isRequired,
      match_id: PropTypes.number.isRequired,
      match_no: PropTypes.number.isRequired,
      match_date: PropTypes.string.isRequired,
      team_a_name: PropTypes.string.isRequired,
      team_b_name: PropTypes.string.isRequired,
      competition_name: PropTypes.string.isRequired,
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
