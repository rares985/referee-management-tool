import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import FetchPersonalMatchHistory from '../actions/PersonalMatchHistoryActions';
import dateConverter from '../utils/datemanip';


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

MatchTable.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.exact({
    match_no: PropTypes.string.isRequired,
    match_date: PropTypes.string.isRequired,
    team_a_name: PropTypes.string.isRequired,
    team_b_name: PropTypes.string.isRequired,
    first_referee_name: PropTypes.string.isRequired,
    second_referee_name: PropTypes.string.isRequired,
    observer: PropTypes.string.isRequired,
    competition: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  })).isRequired,
}

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

PersonalMatchHistory.propTypes = {
  user: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  doFetchPersonalMatchHistory: PropTypes.func.isRequired,
  matches: PropTypes.arrayOf(PropTypes.exact({
    match_no: PropTypes.string.isRequired,
    match_date: PropTypes.string.isRequired,
    team_a_name: PropTypes.string.isRequired,
    team_b_name: PropTypes.string.isRequired,
    first_referee_name: PropTypes.string.isRequired,
    second_referee_name: PropTypes.string.isRequired,
    observer: PropTypes.string.isRequired,
    competition: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  })).isRequired,
  error: PropTypes.string,
}
PersonalMatchHistory.defaultProps = {
  error: '',
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalMatchHistory);
