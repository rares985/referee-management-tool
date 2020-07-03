import { Table, Spinner, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { FetchMatches } from '../actions/MatchesActions';

import DismissibleHelper from '../components/DismissibleHelper';
import dateFormatter from '../utils/datemanip';

const mapStateToProps = (state) => ({
  matches: state.matches.matches,
  loading: state.matches.loading,
  error: state.matches.error,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchMatches: (request) => {
    dispatch(FetchMatches(request));
  },
});

const Matches = (props) => {
  const doFetchMatches = () => {
    const request = { msg: 'Dispatched ON_FETCH_MATCHES' };
    const { onFetchMatches } = props;
    onFetchMatches(request);
  };

  /* eslint-disable no-unused-vars */
  const { matches, loading, error } = props;
  /* eslint-disable no-unused-vars */

  useEffect(() => {
    if (loading) {
      doFetchMatches();
    }
  });

  return (
    <Container fluid>
      {loading && <Spinner animation="border" />}
      {!loading && (
        <>
          <DismissibleHelper heading="Tip" text="Aici poti vedea delegarile confirmate" />
          <Table striped bordered size="sm">
            <thead>
              <tr>
                <th>Nr. Meci</th>
                <th>Data desfasurarii</th>
                <th>Echipa A</th>
                <th>Echipa B</th>
                <th>Locatie</th>
                <th>A1</th>
                <th>A2</th>
                <th>Obs</th>
                <th>Competitie</th>
                <th>Locatie</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => {
                return (
                  <tr key={match.match_no}>
                    <td>{match.match_no}</td>
                    <td>{dateFormatter(match.match_date)}</td>
                    <td>{match.team_a_name}</td>
                    <td>{match.team_b_name}</td>
                    <td>{match.location}</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

Matches.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      match_no: PropTypes.number.isRequired,
      match_date: PropTypes.string.isRequired,
      team_a_name: PropTypes.string.isRequired,
      team_b_name: PropTypes.string.isRequired,
      first_referee_name: PropTypes.string.isRequired,
      second_referee_name: PropTypes.string.isRequired,
      observer: PropTypes.string.isRequired,
      competition: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onFetchMatches: PropTypes.func.isRequired,
};
Matches.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
