import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import DateAdder from './unavailable/DateAdder';

import UnavailableDatesTable from '../components/UnavailableDatesTable';

import {
  FetchUpcomingUnavailabilities,
  FetchOldUnavailabilities,
  AddNewUnavailability,
  DeleteUpcoming,
} from '../actions/UnavailabilityPeriodActions';

const mapStateToProps = (state) => ({
  user: state.login.user,
  upcomingDates: state.unavailabilityPeriods.upcomingDates,
  upcomingLoading: state.unavailabilityPeriods.upcomingLoading,
  oldDates: state.unavailabilityPeriods.oldDates,
  oldLoading: state.unavailabilityPeriods.oldLoading,
  updateFinished: state.unavailabilityPeriods.updateFinished,
  error: state.unavailabilityPeriods.error,
});

const mapDispatchToProps = (dispatch) => ({
  doFetchUpcoming: (request) => {
    dispatch(FetchUpcomingUnavailabilities(request));
  },
  doFetchOld: (request) => {
    dispatch(FetchOldUnavailabilities(request));
  },
  addNewPeriod: (request) => {
    dispatch(AddNewUnavailability(request));
  },

  doDelete: (request) => {
    dispatch(DeleteUpcoming(request));
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Unavailable = (props) => {
  const classes = useStyles();

  const [id, setId] = useState(0);

  /* eslint-disable no-unused-vars */
  const { user, upcomingDates, upcomingLoading, oldDates, oldLoading, error } = props;
  /* eslint-enable no-unused-vars */

  const [newUnavailabilityDates, setNewUnavailabilityDates] = useState([]);

  useEffect(() => {
    const { doFetchUpcoming, doFetchOld } = props;
    if (upcomingLoading) {
      doFetchUpcoming({
        username: user,
      });
    }
    if (oldLoading) {
      doFetchOld({
        username: user,
      });
    }
  });

  const handleNewDateAdd = (date) => {
    setNewUnavailabilityDates([
      ...newUnavailabilityDates,
      {
        id,
        StartDate: date.startDate,
        EndDate: date.endDate,
        Reason: date.reason,
      },
    ]);

    setId(id + 1);
  };

  const onDeleteSelectedUpcoming = (selectedIds) => {
    const { doDelete } = props;
    doDelete({
      ids: selectedIds,
      username: user,
    });
  };

  const onDeleteSelectedNew = (selectedIds) => {
    setNewUnavailabilityDates(
      newUnavailabilityDates.filter((elem) => !selectedIds.includes(elem.id))
    );
  };

  const onConfirmSelectedNew = (selectedIds) => {
    const { addNewPeriod } = props;

    newUnavailabilityDates
      .filter((elem) => selectedIds.includes(elem.id))
      .forEach((date) => {
        addNewPeriod({
          username: user,
          startdate: format(date.StartDate, 'yyyy-MM-dd'),
          enddate: format(date.EndDate, 'yyyy-MM-dd'),
          reason: date.Reason,
        });
      });

    setNewUnavailabilityDates([]);
  };

  return (
    <Container component="main" maxWidth="md" className={classes.container}>
      <CssBaseline>
        <Paper elevation={4} className={classes.root}>
          <UnavailableDatesTable
            loading={oldLoading}
            dates={oldDates}
            title="Perioade de indisponibilitate trecute"
          />
        </Paper>

        <Paper elevation={4} className={classes.root}>
          <UnavailableDatesTable
            loading={upcomingLoading}
            dates={upcomingDates}
            title="Perioade de indisponibilitate în perioada următoare"
            deletable
            handleDeleteSelected={onDeleteSelectedUpcoming}
          />
        </Paper>

        <Paper elevation={4} className={classes.root}>
          <UnavailableDatesTable
            dates={newUnavailabilityDates}
            title="Perioade de indisponibilitate noi"
            deletable
            handleDeleteSelected={onDeleteSelectedNew}
            hasConfirmButton
            handleConfirmSelected={onConfirmSelectedNew}
          />
        </Paper>

        <Paper elevation={4} className={classes.root}>
          <Typography component="h1" variant="h5">
            Adaugă indisponibilitate
          </Typography>
          <DateAdder onAdd={handleNewDateAdd} />
        </Paper>
      </CssBaseline>
    </Container>
  );
};

Unavailable.propTypes = {
  user: PropTypes.string.isRequired,
  upcomingDates: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      StartDate: PropTypes.string.isRequired,
      EndDate: PropTypes.string.isRequired,
      Reason: PropTypes.string.isRequired,
    })
  ).isRequired,
  upcomingLoading: PropTypes.bool.isRequired,
  oldDates: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      StartDate: PropTypes.string.isRequired,
      EndDate: PropTypes.string.isRequired,
      Reason: PropTypes.string.isRequired,
    })
  ).isRequired,
  oldLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  doFetchUpcoming: PropTypes.func.isRequired,
  doFetchOld: PropTypes.func.isRequired,
  doDelete: PropTypes.func.isRequired,
  addNewPeriod: PropTypes.func.isRequired,
};

Unavailable.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Unavailable);
