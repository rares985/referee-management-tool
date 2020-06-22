import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Button, Alert, Form, FormControl, Col, Table, Spinner } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { XIcon, QuestionMarkSquareFill } from '../components/Icons';
import { FetchUpcomingUnavailabilities, FetchOldUnavailabilities, AddNewUnavailability } from '../actions/UnavailabilityPeriodActions';

import dateFormatter from '../utils/datemanip';

const mapStateToProps = (state) => ({
  user: state.login.user,
  upcomingDates: state.unavailabilityPeriods.upcomingDates,
  upcomingLoading: state.unavailabilityPeriods.upcomingLoading,
  oldDates: state.unavailabilityPeriods.oldDates,
  oldLoading: state.unavailabilityPeriods.oldLoading,
  updateFinished: state.unavailabilityPeriods.updateFinished,
  error: state.unavailabilityPeriods.error,
})

const mapDispatchToProps = (dispatch) => ({
  doFetchUpcoming: (request) => {
    dispatch(FetchUpcomingUnavailabilities(request));
  },
  doFetchOld: (request) => {
    dispatch(FetchOldUnavailabilities(request));
  },
  addNewPeriod: (request) => {
    dispatch(AddNewUnavailability(request));
  }
});

/* eslint-disable react/prop-types */
const UnavailableDatesTable = (props) => {

  const handleDelete = (idx) => {
    console.log(`Deleted ${idx}`);
  }

  const { deletable, dates } = props;

  return (
    <Table striped bordered size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Data începerii</th>
          <th>Data încheierii</th>
          <th>Motiv</th>
          {deletable && <th>Sterge</th>}
        </tr>
      </thead>
      <tbody>
        {dates.map((item, i) => {
          return (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{dateFormatter(item.StartDate)}</td>
              <td>{dateFormatter(item.EndDate)}</td>
              <td>{item.Reason}</td>
              {deletable && <td><Button variant="dark" onClick={() => handleDelete(i + 1)}><XIcon /></Button></td>}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const UnavailabilityPeriods = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // eslint-disable-next-line no-unused-vars
  const { user, upcomingDates, upcomingLoading, oldDates, oldLoading, updateFinished, error } = props;

  const [newUnavailabilityDates, setNewUnavailabilityDates] = useState([]);

  const validateForm = () => {
    // return startDate >= Date.now() && endDate >= Date.now() && startDate <= endDate;
    return true;
  };


  useEffect(() => {
    const { doFetchUpcoming, doFetchOld } = props;
    if (upcomingLoading) {
      doFetchUpcoming({
        username: user
      });
    }
    if (oldLoading) {
      doFetchOld({
        username: user
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
      }
    ]);

  };

  const handleConfirm = (event) => {
    // const { addNewPeriod } = props;
    event.preventDefault();

    // addNewPeriod({ StartDate: startDate, EndDate: endDate });
  }

  console.log(newUnavailabilityDates);

  return (
    <div className="page-container">
      <section>
        {oldLoading && <Spinner animation="border" />}
        <h2>Perioade de indisponibilitate trecute</h2>
        {!oldLoading && <UnavailableDatesTable dates={oldDates} />}
      </section>

      <section>
        {upcomingLoading && <Spinner animation="border" />}
        <h2>Perioade de indisponibilitate in perioada urmatoare</h2>
        {!upcomingLoading && <UnavailableDatesTable dates={upcomingDates} />}
      </section>

      <section>
        <h2>Perioade de indisponibilitate noi</h2>
        <UnavailableDatesTable deletable dates={newUnavailabilityDates} />
        <Button block onClick={handleConfirm}>
          Confirmă
        </Button>
      </section>

      <section>
        <h2> Adaugă indisponibilitate </h2>
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
              <Button block disabled={!validateForm()} type="submit">
                Adaugă
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </section>
    </div>
  );
};
/* eslint-enable */

export default connect(mapStateToProps, mapDispatchToProps)(UnavailabilityPeriods);
