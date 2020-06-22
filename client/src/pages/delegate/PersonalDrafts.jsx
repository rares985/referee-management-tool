import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner, Table } from 'react-bootstrap';

/* eslint-disable react/prop-types */
import { FetchPersonalDrafts } from '../../actions/delegate/personalDraftsActions';

import dateFormatter from '../../utils/datemanip';


const mapStateToProps = (state) => ({
  user: state.login.user,
  drafts: state.delegate.personal.drafts,
  draftsLoading: state.delegate.personal.draftsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  DoFetchDrafts: (request) => {
    dispatch(FetchPersonalDrafts(request));
  },
});


const ProposedDrafts = (props) => {

  // eslint-disable-next-line no-unused-vars
  const { user, drafts, draftsLoading, error } = props;

  useEffect(() => {
    const { DoFetchDrafts } = props;

    if (draftsLoading) {
      DoFetchDrafts({
        username: user,
      });
    }

  });

  return (
    <>
      {draftsLoading && <Spinner animation="border" />}
      {!draftsLoading &&
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Data</th>
              <th>A1</th>
              <th>A2</th>
              <th>Obs</th>
              <th>Echipa A</th>
              <th>Echipa B</th>
              <th>Locatie</th>
              <th>Competitie</th>
            </tr>
          </thead>
          <tbody>
            {drafts.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.match_no}</td>
                  <td>{dateFormatter(item.match_date)}</td>
                  <td>{item.first_referee}</td>
                  <td>{item.second_referee}</td>
                  <td>{item.observer}</td>
                  <td>{item.team_a_name}</td>
                  <td>{item.team_b_name}</td>
                  <td>{item.location}</td>
                  <td>{item.competition_name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      }
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposedDrafts);

/* eslint-enable react/prop-types */