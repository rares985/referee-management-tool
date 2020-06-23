import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner, Table } from 'react-bootstrap';

/* eslint-disable react/prop-types */
import { FetchRejectedDrafts, FetchRejectedShortlist } from '../../actions/delegate/rejectedDraftsActions';

import dateFormatter from '../../utils/datemanip';


const mapStateToProps = (state) => ({
  user: state.login.user,
  drafts: state.delegate.rejected.rejected,
  draftsLoading: state.delegate.rejected.rejectedLoading,
  shortlist: state.delegate.rejected.shortlist,
  shortlistLoading: state.delegate.rejected.shortlistLoading,
  error: state.delegate.rejected.error
});

const mapDispatchToProps = (dispatch) => ({
  DoFetchDrafts: (request) => {
    dispatch(FetchRejectedDrafts(request));
  },
  DoFetchShortlist: (request) => {
    dispatch(FetchRejectedShortlist(request));
  }
});


const RejectedDrafts = (props) => {

  // eslint-disable-next-line no-unused-vars
  const { user, drafts, shortlist, draftsLoading, shortlistLoading, error } = props;

  useEffect(() => {
    const { DoFetchDrafts, DoFetchShortlist } = props;

    if (draftsLoading) {
      DoFetchDrafts({
        username: user,
      });
    }

    if (shortlistLoading) {
      DoFetchShortlist({
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

export default connect(mapStateToProps, mapDispatchToProps)(RejectedDrafts);

/* eslint-enable react/prop-types */