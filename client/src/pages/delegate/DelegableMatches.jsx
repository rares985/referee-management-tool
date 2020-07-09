import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { CircularProgress } from '@material-ui/core';
import { groupBy } from 'lodash';
import NiceTableCustomPicker from '../../components/NiceTableCustomPicker';

import {
  FetchDelegableMatches,
  FetchEligibleRefs,
} from '../../actions/delegate/delegableMatchesActions';

import { AddDraft } from '../../actions/delegate/personalDraftsActions';

import dateConverter from '../../utils/datemanip';

const mapStateToProps = (state) => ({
  user: state.login.user,
  matches: state.delegate.delegable.matches,
  matchesLoading: state.delegate.delegable.matchesLoading,
  shortlist: state.delegate.delegable.shortlist,
  shortlistLoading: state.delegate.delegable.shortlistLoading,
});

const mapDispatchToProps = (dispatch) => ({
  DoFetchMatches: (request) => {
    dispatch(FetchDelegableMatches(request));
  },
  DoFetchShortlist: (request) => {
    dispatch(FetchEligibleRefs(request));
  },
  DoAddDraft: (request) => {
    dispatch(AddDraft(request));
  },
});

const DelegableMatches = (props) => {
  /* eslint-disable no-unused-vars */
  const { user, matches, shortlist, matchesLoading, shortlistLoading, error } = props;
  /* eslint-enable no-unused-vars */

  useEffect(() => {
    const { DoFetchMatches } = props;

    if (matchesLoading) {
      DoFetchMatches({
        username: user,
      });
    }
  }, [matchesLoading]);

  useEffect(() => {
    const { DoFetchShortlist } = props;
    if (shortlistLoading) {
      DoFetchShortlist({
        username: user,
      });
    }
  }, [shortlistLoading]);

  const onFirstRefereeChoice = (choice) => {
    const { matchId, refereeId } = choice;
    const { DoAddDraft } = props;

    DoAddDraft({
      username: user,
      firstRefereeId: refereeId,
      matchId,
    });
  };

  const onSecondRefereeChoice = (choice) => {
    const { matchId, refereeId } = choice;
    const { DoAddDraft } = props;

    DoAddDraft({
      username: user,
      secondRefereeId: refereeId,
      matchId,
    });
  };

  const onObserverChoice = (choice) => {
    const { matchId, refereeId } = choice;
    const { DoAddDraft } = props;

    DoAddDraft({
      username: user,
      observerId: refereeId,
      matchId,
    });
  };

  const headCells = [
    { id: 'match_no', numeric: true, disablePadding: false, label: 'Număr meci' },
    { id: 'match_date', numeric: false, disablePadding: false, label: 'Data desfășurării' },
    { id: 'team_a_name', numeric: false, disablePadding: false, label: 'Echipa A' },
    { id: 'team_b_name', numeric: false, disablePadding: false, label: 'Echipa B' },
    { id: 'competition_name', numeric: false, disablePadding: false, label: 'Competiție' },
    {
      id: 'first_referee_name',
      numeric: false,
      disablePadding: false,
      label: 'Primul arbitru (A1)',
    },
    {
      id: 'second_referee_name',
      numeric: false,
      disablePadding: false,
      label: 'Arbitru secund (A2) ',
    },
    { id: 'observer_name', numeric: false, disablePadding: false, label: 'Observator' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Locație' },
  ];

  const shortlistById = groupBy(shortlist, (elem) => elem.match_id);

  return (
    <>
      {(matchesLoading || shortlistLoading) && <CircularProgress />}
      {!(matchesLoading || shortlistLoading) && (
        <NiceTableCustomPicker
          tableName="Meciuri delegabile"
          primaryKey="match_id"
          headCells={headCells}
          handleFirstRefereeChoice={onFirstRefereeChoice}
          handleSecondRefereeChoice={onSecondRefereeChoice}
          handleObserverChoice={onObserverChoice}
          shortlistById={shortlistById}
          rows={matches.map((elem) => ({
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

DelegableMatches.propTypes = {
  user: PropTypes.string.isRequired,
  matches: PropTypes.arrayOf(
    PropTypes.exact({
      match_id: PropTypes.number.isRequired,
      match_no: PropTypes.number.isRequired,
      match_date: PropTypes.string.isRequired,
      team_a_name: PropTypes.string.isRequired,
      team_b_name: PropTypes.string.isRequired,
      competition_name: PropTypes.string.isRequired,
      season: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
  shortlist: PropTypes.arrayOf(
    PropTypes.exact({
      match_id: PropTypes.number.isRequired,
      referee_id: PropTypes.number.isRequired,
      referee_name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  matchesLoading: PropTypes.bool,
  shortlistLoading: PropTypes.bool,
  error: PropTypes.string,
  DoFetchMatches: PropTypes.func.isRequired,
  DoFetchShortlist: PropTypes.func.isRequired,
  DoAddDraft: PropTypes.func.isRequired,
};

DelegableMatches.defaultProps = {
  error: '',
  matchesLoading: true,
  shortlistLoading: true,
};

export default connect(mapStateToProps, mapDispatchToProps)(DelegableMatches);
