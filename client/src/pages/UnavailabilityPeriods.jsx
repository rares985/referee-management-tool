import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Form, FormControl, Col } from 'react-bootstrap';

import EnhancedTableSelectable from '../components/EnhancedTableSelectable';

import dateFormatter from '../utils/datemanip';

import {
  FetchUpcomingUnavailabilities,
  FetchOldUnavailabilities,
  AddNewUnavailability,
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

const UnavailabilityPeriods = (props) => {
  const classes = useStyles();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  /* eslint-disable no-unused-vars */
  const {
    user,
    upcomingDates,
    upcomingLoading,
    oldDates,
    oldLoading,
    updateFinished,
    error,
  } = props;
  /* eslint-enable no-unused-vars */

  const [newUnavailabilityDates, setNewUnavailabilityDates] = useState([]);

  const validateForm = () => {
    // return startDate >= Date.now() && endDate >= Date.now() && startDate <= endDate;
    return true;
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewUnavailabilityDates([
      ...newUnavailabilityDates,
      {
        StartDate: startDate,
        EndDate: endDate,
      },
    ]);
  };

  const tables = [
    {
      loading: oldLoading,
      title: 'Perioade de indisponibilitate trecute',
      dates: oldDates,
    },
    {
      loading: upcomingLoading,
      title: 'Perioade de indisponibilitate în perioada următoare',
      dates: upcomingDates,
      deletable: true,
    },
    {
      loading: false,
      title: 'Perioade de indisponibilitate noi',
      dates: newUnavailabilityDates,
    },
  ];

  const headCells = [
    {
      id: 'StartDate',
      numeric: false,
      disablePadding: false,
      label: 'Data începerii',
    },
    {
      id: 'EndDate',
      numeric: false,
      disablePadding: false,
      label: 'Data încheierii',
    },
    {
      id: 'Reason',
      numeric: false,
      disablePadding: false,
      label: 'Motiv',
    },
  ];

  return (
    <Container component="main" maxWidth="md" className={classes.container}>
      <CssBaseline>
        {tables.map((table) => {
          return (
            <Paper elevation={4} className={classes.root} key={table.title}>
              {table.loading && <CircularProgress />}
              {!table.loading && (
                <EnhancedTableSelectable
                  tableName={table.title}
                  rows={table.dates.map((elem) => ({
                    ...elem,
                    StartDate: dateFormatter(elem.StartDate),
                    EndDate: dateFormatter(elem.EndDate),
                  }))}
                  headCells={headCells}
                  selectedKey="id"
                  selectable={table.deletable}
                />
              )}
            </Paper>
          );
        })}

        <Paper elevation={4} className={classes.root}>
          <Typography component="h1" variant="h5">
            Adaugă indisponibilitate
          </Typography>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col>
                <FormControl
                  autoFocus
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Col>
              <Col>
                <FormControl
                  autoFocus
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Col>
              <Col>
                <Button
                  variant="contained"
                  color="primary"
                  block="true"
                  disabled={!validateForm()}
                  type="submit"
                >
                  Adaugă
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Paper>
      </CssBaseline>
    </Container>
  );
};

UnavailabilityPeriods.propTypes = {
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
  updateFinished: PropTypes.bool.isRequired,
  error: PropTypes.string,
  doFetchUpcoming: PropTypes.func.isRequired,
  doFetchOld: PropTypes.func.isRequired,
};

UnavailabilityPeriods.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(UnavailabilityPeriods);
