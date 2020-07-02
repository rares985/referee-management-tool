import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { CircularProgress } from '@material-ui/core';
import { groupBy } from 'lodash';
import EnhancedTable from '../../components/EnhancedTable';

import { FetchDelegableMatches, FetchEligibleRefs } from '../../actions/delegate/delegableMatchesActions';

import addUpdateArray from '../../utils/arraymanip';
import dateConverter from '../../utils/datemanip';


const mapStateToProps = (state) => ({
  user: state.login.user,
  matches: state.delegate.delegable.matches,
  matchesLoading: state.delegate.delegable.matchesLoading,
  shortlist: state.delegate.delegable.shortlist,
  shortlistLoading: state.delegate.delegable.shortlistLoading
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

  }, [matchesLoading, shortlistLoading]);
  // eslint-disable-next-line no-unused-vars
  const OnRefSelectedA1 = (matchid, ref) => {
    setDelegations(addUpdateArray(delegations, matchid, "a1", ref));
  }
  // eslint-disable-next-line no-unused-vars
  const OnRefSelectedA2 = (matchid, ref) => {
    setDelegations(addUpdateArray(delegations, matchid, "a2", ref));
  }
  // eslint-disable-next-line no-unused-vars
  const OnRefSelectedObs = (matchid, ref) => {
    setDelegations(addUpdateArray(delegations, matchid, "Obs", ref));
  }

  // eslint-disable-next-line no-unused-vars
  const GetRefereeName = (matchid, pos) => {
    const idx = delegations.findIndex(elem => elem.matchid === matchid);
    if (idx !== -1) {
      if (delegations[idx][pos]) {
        return delegations[idx][pos].referee;
      }
    }
    return 'Arbitru nedelegat';
  }

  // eslint-disable-next-line no-unused-vars
  const handleDelegationSubmit = (event) => {
    // event.preventDefault();
    // const formatted = delegations.map(elem => ({
    //   "created_by": props.userid,
    //   "first_referee_id": elem.a1.refid,
    //   "second_referee_id": elem.a2.refid,
    //   "observer_id": elem.Obs.refid,
    //   "match_id": elem.matchid
    // }));

    // axios
    //     .post("/api/drafts", {
    //         matches: formatted
    //     })
    //     .then(response => {
    //         if (response.status === 200) {
    //             console.log('OK, drafts posted');
    //         }
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });

  }
  // eslint-disable-next-line no-unused-vars
  const shortlistById = groupBy(shortlist, elem => elem.match_id);

  const headCells = [
    { id: 'match_no', numeric: false, disablePadding: false, label: 'Număr meci' },
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
      {matchesLoading && <CircularProgress />}
      {!matchesLoading &&
        <EnhancedTable
          tableName="Meciuri delegabile"
          rows={matches.map(elem => ({
            ...elem, match_date: dateConverter(elem.match_date), a1: '-', a2: '-', obs: '-'
          }))}
          headCells={headCells}
        />
      }
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
      full_name_competition: PropTypes.string.isRequired,
      season: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
  shortlist: PropTypes.arrayOf(
    PropTypes.exact({
      match_id: PropTypes.number.isRequired,
      referee_id: PropTypes.number.isRequired,
      referee_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  matchesLoading: PropTypes.bool,
  shortlistLoading: PropTypes.bool,
  error: PropTypes.string,
  DoFetchMatches: PropTypes.func.isRequired,
  DoFetchShortlist: PropTypes.func.isRequired,
}

DelegableMatches.defaultProps = {
  error: '',
  matchesLoading: true,
  shortlistLoading: true,
}

export default connect(mapStateToProps, mapDispatchToProps)(DelegableMatches);