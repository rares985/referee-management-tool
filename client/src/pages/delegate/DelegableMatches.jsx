import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { CircularProgress } from '@material-ui/core';
import { groupBy } from 'lodash';
import NiceTableCustomPicker from '../../components/NiceTableCustomPicker';

import {
  FetchDelegableMatches,
  FetchEligibleRefs,
} from '../../actions/delegate/delegableMatchesActions';

import addUpdateArray from '../../utils/arraymanip';
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
});

const DelegableMatches = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [delegated, setDelegated] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [delegations, setDelegations] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const { user, matches, shortlist, matchesLoading, shortlistLoading, error } = props;

  useEffect(() => {
    const { DoFetchMatches, DoFetchShortlist } = props;

    if (matchesLoading) {
      DoFetchMatches({
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
  const GetRefereeName = (matchid, pos) => {
    const idx = delegations.findIndex((elem) => elem.matchid === matchid);
    if (idx !== -1) {
      if (delegations[idx][pos]) {
        return delegations[idx][pos].referee;
      }
    }
    return 'Arbitru nedelegat';
  };

  // eslint-disable-next-line no-unused-vars
  const handleDelegationSubmit = (event) => {};

  // eslint-disable-next-line no-unused-vars
  const onFirstRefereeChoice = (matchId, referee) => {
    console.log(`Chosen ${referee.referee_name} as A1 for match with id ${matchId}`);
    setDelegations(addUpdateArray(delegations, matchId, 'first_referee', referee));
    console.dir(delegations);
  };

  // eslint-disable-next-line no-unused-vars
  const onSecondRefereeChoice = (matchId, referee) => {
    console.log(`Chosen ${referee.referee_name} as A2 for match with id ${matchId}`);
    setDelegations(addUpdateArray(delegations, matchId, 'second_referee', referee));
  };

  // eslint-disable-next-line no-unused-vars
  const onObserverChoice = (matchId, referee) => {
    console.log(`Chosen ${referee.referee_name} as Observer for match with id ${matchId}`);
    setDelegations(addUpdateArray(delegations, matchId, 'observer', referee));
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
  console.dir(shortlistById);

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
};

DelegableMatches.defaultProps = {
  error: '',
  matchesLoading: true,
  shortlistLoading: true,
};

export default connect(mapStateToProps, mapDispatchToProps)(DelegableMatches);
