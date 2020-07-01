import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

/* eslint-disable react/prop-types */
import { FetchPersonalDrafts } from '../../actions/delegate/personalDraftsActions';
import TableHeaderSelector from '../../components/TableHeaderSelector';
import EnhancedTable from '../../components/EnhancedTable';

import dateConverter from '../../utils/datemanip';


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

/* eslint-disable no-unused-vars */

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
  }, [draftsLoading]);

  const headCells = [
    { id: 'match_no', numeric: true, disablePadding: true, label: 'Număr meci' },
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
      {draftsLoading && <CircularProgress />}
      <TableHeaderSelector />
      {!draftsLoading &&
        <EnhancedTable
          tableName="În lucru (ciorne) "
          rows={drafts.map(elem => (
            { ...elem, match_date: dateConverter(elem.match_date), a1: '-', a2: '-', obs: '-' }
          ))}
          headCells={headCells}
          selectable
        />
      }
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposedDrafts);

/* eslint-enable react/prop-types */