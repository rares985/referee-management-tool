import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import {
  FetchPersonalDrafts,
  FetchPersonalDraftsShortlist,
} from '../../actions/delegate/personalDraftsActions';
import TableHeaderSelector from '../../components/TableHeaderSelector';
import EnhancedTable from '../../components/EnhancedTable';

import dateConverter from '../../utils/datemanip';

const mapStateToProps = (state) => ({
  user: state.login.user,
  drafts: state.delegate.personal.drafts,
  draftsLoading: state.delegate.personal.draftsLoading,
  shortlist: state.delegate.personal.shortlist,
  shortlistLoading: state.delegate.personal.shortlistLoading,
});

const mapDispatchToProps = (dispatch) => ({
  DoFetchDrafts: (request) => {
    dispatch(FetchPersonalDrafts(request));
  },
  DoFetchShortlist: (request) => {
    dispatch(FetchPersonalDraftsShortlist(request));
  },
});

const PersonalDrafts = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { user, drafts, draftsLoading, shortlist, shortlistLoading, error } = props;

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

  /* eslint-disable no-console */
  const onFirstRefereeChoice = (id, referee) => {
    console.log(`Chosen ${referee} as A1 for ${id}`);
  };

  const onSecondRefereeChoice = (id, referee) => {
    console.log(`Chosen ${referee} as A2 for ${id}`);
  };

  const onObserverChoice = (id, referee) => {
    console.log(`Chosen ${referee} as Observer for ${id}`);
  };
  /* eslint-enable no-console */

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
      {(draftsLoading || shortlistLoading) && <CircularProgress />}
      <TableHeaderSelector />
      {!(draftsLoading || shortlistLoading) && (
        <EnhancedTable
          selectedKey="id"
          shortlistById={shortlist}
          handleFirstRefereeChoice={onFirstRefereeChoice}
          handleSecondRefereeChoice={onSecondRefereeChoice}
          handleObserverChoice={onObserverChoice}
          tableName="În lucru (ciorne) "
          rows={drafts.map((elem) => ({
            ...elem,
            match_date: dateConverter(elem.match_date),
          }))}
          headCells={headCells}
          selectable
        />
      )}
    </>
  );
};

PersonalDrafts.propTypes = {
  user: PropTypes.string.isRequired,
  drafts: PropTypes.arrayOf(
    PropTypes.exact({
      draft_id: PropTypes.number.isRequired,
      match_id: PropTypes.number.isRequired,
      match_no: PropTypes.number.isRequired,
      match_date: PropTypes.string.isRequired,
      first_referee: PropTypes.string.isRequired,
      second_referee: PropTypes.string.isRequired,
      observer: PropTypes.string.isRequired,
      team_a_name: PropTypes.string.isRequired,
      team_b_name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      competition_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  shortlist: PropTypes.arrayOf(
    PropTypes.exact({
      draft_id: PropTypes.number.isRequired,
      referee_id: PropTypes.number.isRequired,
      referee_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  draftsLoading: PropTypes.bool,
  shortlistLoading: PropTypes.bool,
  error: PropTypes.string,
  DoFetchDrafts: PropTypes.func.isRequired,
  DoFetchShortlist: PropTypes.func.isRequired,
};

PersonalDrafts.defaultProps = {
  error: '',
  draftsLoading: true,
  shortlistLoading: true,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDrafts);
