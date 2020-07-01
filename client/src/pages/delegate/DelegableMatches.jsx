import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from 'react-bootstrap';
import { CircularProgress, Checkbox } from '@material-ui/core';
import { groupBy } from 'lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from '../../components/EnhancedTable';

import { FetchDelegableMatches, FetchEligibleRefs } from '../../actions/delegate/delegableMatchesActions';
import ChooseRefereeModal from '../../components/ChooseRefereeModal';

import TableHeaderSelector from '../../components/TableHeaderSelector';
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
  doFetchMatches: (request) => {
    dispatch(FetchDelegableMatches(request));
  },
  doFetchShortlist: (request) => {
    dispatch(FetchEligibleRefs(request));
  },
});

const DelegableMatches = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [delegated, setDelegated] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [delegations, setDelegations] = useState([]);

  const [selected, setSelected] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const { user, matches, shortlist, matchesLoading, shortlistLoading, error } = props;

  useEffect(() => {
    const { doFetchMatches, doFetchShortlist } = props;

    if (matchesLoading) {
      doFetchMatches({
        username: user,
      });
    }

    if (shortlistLoading) {
      doFetchShortlist({
        username: user,
      });
    }

  }, [matchesLoading, shortlistLoading]);

  const OnRefSelectedA1 = (matchid, ref) => {
    setDelegations(addUpdateArray(delegations, matchid, "a1", ref));
  }
  const OnRefSelectedA2 = (matchid, ref) => {
    setDelegations(addUpdateArray(delegations, matchid, "a2", ref));
  }
  const OnRefSelectedObs = (matchid, ref) => {
    setDelegations(addUpdateArray(delegations, matchid, "Obs", ref));
  }

  const GetRefereeName = (matchid, pos) => {
    const idx = delegations.findIndex(elem => elem.matchid === matchid);
    if (idx !== -1) {
      if (delegations[idx][pos]) {
        return delegations[idx][pos].referee;
      }
    }
    return 'Arbitru nedelegat';
  }

  const handleDelegationSubmit = (event) => {
    event.preventDefault();
    const formatted = delegations.map(elem => ({
      "created_by": props.userid,
      "first_referee_id": elem.a1.refid,
      "second_referee_id": elem.a2.refid,
      "observer_id": elem.Obs.refid,
      "match_id": elem.matchid
    }));

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

  const onSelectAllClick = () => {

  }
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
/* eslint-enable react/prop-types */
export default connect(mapStateToProps, mapDispatchToProps)(DelegableMatches);