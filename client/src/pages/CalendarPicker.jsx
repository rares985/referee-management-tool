import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, FormLabel, Table, Spinner } from 'react-bootstrap';
import { XIcon } from '../components/Icons';
import FetchUnavailabilityPeriods from '../actions/UnavailabilityPeriodActions';

const mapStateToProps = (state) => ({
  user: state.login.user,
  confirmedDates: state.unavailabilityPeriods.confirmedDates,
  loading: state.unavailabilityPeriods.loading,
  error: state.unavailabilityPeriods.error,
})

const mapDispatchToProps = (dispatch) => ({
  doFetchUnavailabilityPeriods: (request) => {
    dispatch(FetchUnavailabilityPeriods(request));
  }
});

const dateConverter = (date) => {
  const dt = new Date(date);

  return `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;
}

/* eslint-disable */
const UnavailableDatesTable = (props) => {

  const handleDelete = (idx) => {
    console.log(`Deleted ${idx}`);
  }

  return (
    <Table striped bordered size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Data începerii</th>
          <th>Data încheierii</th>
          {props.deletable && <th>Sterge</th>}
        </tr>
      </thead>
      <tbody>
        {props.dates.map((item, i) => {
          const itemJson = JSON.parse(item);
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{dateConverter(itemJson.StartDate)}</td>
              <td>{dateConverter(itemJson.EndDate)}</td>
              {props.deletable && <td><Button variant="dark" onClick={() => handleDelete(i + 1)}><XIcon /></Button></td>}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const CalendarPicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { user, confirmedDates, loading, error } = props;

  const [newUnavailabilityDates, setNewUnavailabilityDates] = useState([]);

  const validateForm = () => {
    // return startDate >= Date.now() && endDate >= Date.now() && startDate <= endDate;
    return true;
  };


  useEffect(() => {
    const { doFetchUnavailabilityPeriods } = props;
    if (loading) {
      doFetchUnavailabilityPeriods({
        username: user
      });
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewUnavailabilityDates([
      ...newUnavailabilityDates,
      JSON.stringify({
        StartDate: startDate,
        EndDate: endDate,
      })
    ]);
  };

  return (
    <div className="page-container">
      {loading && <Spinner animation="border" />}
      <h2>Perioade de indisponibilitate deja confirmate</h2>
      {!loading && <UnavailableDatesTable dates={confirmedDates} />}
      <h2>Perioade de indisponibilitate noi</h2>
      {!loading && <UnavailableDatesTable deletable dates={newUnavailabilityDates} />}
      {!loading &&
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="start_date">
            <FormLabel>Data începerii</FormLabel>
            <FormControl
              autoFocus
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="end_date">
            <FormLabel>Data încheierii</FormLabel>
            <FormControl
              autoFocus
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormGroup>
          <Button block disabled={!validateForm()} type="submit">
            Adaugă
          </Button>
        </form>
      }
    </div>
  );
};
/* eslint-enable */

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPicker);
