import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
/* eslint-disable react/prop-types */
import { Table, Spinner, Button } from 'react-bootstrap';
import { groupBy } from 'lodash';

import { FetchDelegableMatches, FetchEligibleRefs } from '../../actions/delegate/delegableMatchesActions';
import ChooseRefereeModal from '../../components/ChooseRefereeModal';

import { ArrowUpDown } from '../../components/Icons';
import addUpdateArray from '../../utils/arraymanip';




const mapStateToProps = (state) => ({
  user: state.login.user,
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

  });

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

    console.log(formatted);
  }


  const shortlistById = groupBy(shortlist, elem => elem.id);
  return (
    <>
      {matchesLoading && <Spinner animation="border" />}
      {!matchesLoading &&
        <>
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Data</th>
                <th>Echipa A <ArrowUpDown /> </th>
                <th>Echipa B <ArrowUpDown /></th>
                <th>Competitie <ArrowUpDown /></th>
                <th>A1</th>
                <th>A2</th>
                <th>Obs</th>
                <th>Locație </th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => {
                const d = new Date(match.match_date);
                const dstr = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
                return (
                  <tr key={match.id}>
                    <td>
                      {match.match_no}
                    </td>
                    <td>
                      {dstr}
                    </td>
                    <td>
                      {match.team_a_name}
                    </td>
                    <td>
                      {match.team_b_name}
                    </td>
                    <td>
                      {match.competition}
                    </td>
                    <td>
                      {GetRefereeName(match.id, "a1")}
                      {!shortlistLoading &&
                        <ChooseRefereeModal shortlist={shortlistById} matchid={match.id} onSaveCloseCB={OnRefSelectedA1} />
                      }
                    </td>
                    <td>
                      {GetRefereeName(match.id, "a2")}
                      {!shortlistLoading &&
                        <ChooseRefereeModal shortlist={shortlistById} matchid={match.id} onSaveCloseCB={OnRefSelectedA2} />
                      }
                    </td>
                    <td>
                      {GetRefereeName(match.id, "Obs")}
                      {!shortlistLoading &&
                        <ChooseRefereeModal shortlist={shortlistById} matchid={match.id} onSaveCloseCB={OnRefSelectedObs} />
                      }
                    </td>
                    <td>
                      {match.location}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Button onClick={handleDelegationSubmit}>
            Propune pentru aprobare
        </Button>
        </>
      }
    </>
  );

};
/* eslint-enable react/prop-types */
export default connect(mapStateToProps, mapDispatchToProps)(DelegableMatches);