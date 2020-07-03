import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { Table, Button, Container } from 'react-bootstrap';

import { XIcon } from '../components/Icons';
import TableHeaderSelector from '../components/TableHeaderSelector';

import FetchApprovableDrafts from '../actions/approve/approveDraftsActions';

import dateFormatter from '../utils/datemanip';

const mapStateToProps = (state) => ({
  user: state.login.user,
  drafts: state.approvable.drafts,
  draftsLoading: state.approvable.draftsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  DoFetchDrafts: (request) => {
    dispatch(FetchApprovableDrafts(request));
  },
});

const ApproveDrafts = (props) => {
  /* eslint-disable no-unused-vars */
  const { user, drafts, draftsLoading, error } = props;
  /* eslint-enable no-unused-vars */

  useEffect(() => {
    const { DoFetchDrafts } = props;
    if (draftsLoading) {
      DoFetchDrafts({
        username: user,
      });
    }
  });

  return (
    <Container fluid>
      {draftsLoading && <CircularProgress />}
      {!draftsLoading && (
        <>
          <TableHeaderSelector />
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Data</th>
                <th>Echipa A</th>
                <th>Echipa B</th>
                <th>Locatie</th>
                <th>A1</th>
                <th>A2</th>
                <th>Observator</th>
                <th>Competitie</th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((match) => {
                return (
                  <tr key={match.id}>
                    <td>{match.match_no}</td>
                    <td>{dateFormatter(match.match_date)}</td>
                    <td>{match.team_a_name}</td>
                    <td>{match.team_b_name}</td>
                    <td>{match.location}</td>
                    <td>
                      {match.first_referee_name}
                      <Button>
                        <XIcon />
                      </Button>
                    </td>
                    <td>
                      {match.second_referee_name}
                      <Button>
                        <XIcon />
                      </Button>
                    </td>
                    <td>{match.observer_name}</td>
                    <td>{match.full_name_competition}</td>
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

ApproveDrafts.propTypes = {
  user: PropTypes.string.isRequired,
  draftsLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  drafts: PropTypes.arrayOf(
    PropTypes.exact({
      match_no: PropTypes.string.isRequired,
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
  DoFetchDrafts: PropTypes.func.isRequired,
};

ApproveDrafts.defaultProps = {
  error: '',
};
export default connect(mapStateToProps, mapDispatchToProps)(ApproveDrafts);
