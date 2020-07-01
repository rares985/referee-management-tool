import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import FetchPersonalMatchHistory from '../actions/PersonalMatchHistoryActions';
import dateConverter from '../utils/datemanip';

/* eslint-disable react/prop-types */
const mapStateToProps = (state) => ({
  user: state.login.user,
  info: state.personal.matchhistory.matches,
  loading: state.personal.matchhistory.loading,
  error: state.personal.matchhistory.error
});

const mapDispatchToProps = (dispatch) => ({
  doFetchPersonalMatchHistory: (request) => {
    dispatch(FetchPersonalMatchHistory(request));
  },
});

const MatchTable = (props) => {
  const { matches } = props;
  return (
    <Table striped bordered size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Data</th>
          <th>Echipa A</th>
          <th>Echipa B</th>
          <th>A1</th>
          <th>A2</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match) => {
          return (
            <tr key={match.match_no}>
              <td>
                {match.match_no}
              </td>
              <td>
                {dateConverter(match.match_date)}
              </td>
              <td>
                {match.team_a_name}
              </td>
              <td>
                {match.team_b_name}
              </td>
              <td>
                {match.first_referee_name}
              </td>
              <td>
                {match.second_referee_name}
              </td>
              <td>
                {match.observer}
              </td>
              <td>
                {match.competition}
              </td>
              <td>
                {match.location}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
};

const PersonalMatchHistory = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { user, loading, error, matches } = props;

  useEffect(() => {
    const { doFetchPersonalMatchHistory } = props;

    if (loading) {
      doFetchPersonalMatchHistory({
        username: user,
      });
    }
  }, [loading]);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading &&
        <MatchTable matches={matches} />
      }
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalMatchHistory);
