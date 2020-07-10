import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { CircularProgress } from '@material-ui/core';
import NiceTableCustomPicker from '../../components/NiceTableCustomPicker';

import {
  FetchRejectedDrafts,
  FetchRejectedShortlist,
} from '../../actions/delegate/rejectedDraftsActions';
import dateConverter from '../../utils/datemanip';

const mapStateToProps = (state) => ({
  user: state.login.user,
  drafts: state.delegate.rejected.rejected,
  draftsLoading: state.delegate.rejected.rejectedLoading,
  shortlist: state.delegate.rejected.shortlist,
  shortlistLoading: state.delegate.rejected.shortlistLoading,
  error: state.delegate.rejected.error,
});

const mapDispatchToProps = (dispatch) => ({
  DoFetchDrafts: (request) => {
    dispatch(FetchRejectedDrafts(request));
  },
  DoFetchShortlist: (request) => {
    dispatch(FetchRejectedShortlist(request));
  },
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

  // eslint-disable-next-line no-unused-vars
  const onFirstRefereeChoice = (event) => {};

  // eslint-disable-next-line no-unused-vars
  const onSecondRefereeChoice = (event) => {};

  // eslint-disable-next-line no-unused-vars
  const onObserverChoice = (event) => {};

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

  const shortlistById = groupBy(shortlist, (elem) => elem.draft_id);

  return (
    <>
      {(draftsLoading || shortlistLoading) && <CircularProgress />}
      {!(draftsLoading || shortlistLoading) && (
        <NiceTableCustomPicker
          tableName="Propuneri respinse "
          primaryKey="match_id"
          headCells={headCells}
          handleFirstRefereeChoice={onFirstRefereeChoice}
          handleSecondRefereeChoice={onSecondRefereeChoice}
          handleObserverChoice={onObserverChoice}
          shortlistById={shortlistById}
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

RejectedDrafts.propTypes = {
  user: PropTypes.string.isRequired,
  drafts: PropTypes.arrayOf(
    PropTypes.exact({
      draft_id: PropTypes.number.isRequired,
      match_id: PropTypes.number.isRequired,
      match_no: PropTypes.number.isRequired,
      match_date: PropTypes.string.isRequired,
      first_referee: PropTypes.string.isRequired,
      second_referee: PropTypes.string.isRequired,
      observer: PropTypes.string.isRequired,
      team_a_name: PropTypes.string.isRequired,
      team_b_name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      competition_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  shortlist: PropTypes.arrayOf(
    PropTypes.exact({
      draft_id: PropTypes.number.isRequired,
      match_id: PropTypes.number.isRequired,
      referee_id: PropTypes.number.isRequired,
      referee_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  draftsLoading: PropTypes.bool.isRequired,
  shortlistLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  DoFetchDrafts: PropTypes.func.isRequired,
  DoFetchShortlist: PropTypes.func.isRequired,
};

RejectedDrafts.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(RejectedDrafts);
