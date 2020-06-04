import React, { useState, useEffect } from 'react';
import { Button, FormGroup, FormControl, FormLabel, Table, Spinner } from 'react-bootstrap';
import { XIcon } from '../components/Icons';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
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
  const [isLoading, setIsLoading] = useState(true);

  const [confirmedUnavailabilityDates, setConfirmedUnavailabilityDates] = useState([]);
  const [newUnavailabilityDates, setNewUnavailabilityDates] = useState([]);

  const validateForm = () => {
    // return startDate >= Date.now() && endDate >= Date.now() && startDate <= endDate;
    return true;
  };


  useEffect(() => {
    if (isLoading) {
      axios
        .get('/api/addUnavailable', {
          params: {
            username: props.authenticatedUser
          }
        })
        .then(
          (response) => {
            if (response.status === 200) {
              setIsLoading(false);
              setConfirmedUnavailabilityDates(response.data);
              console.log('OK!');
            }
          },
          (error) => {
            console.error(error);
          }
        );
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
      {isLoading && <Spinner animation="border" />}
      <h2>Perioade de indisponibilitate deja confirmate</h2>
      {!isLoading && <UnavailableDatesTable dates={confirmedUnavailabilityDates} />}
      <h2>Perioade de indisponibilitate noi</h2>
      {!isLoading && <UnavailableDatesTable deletable dates={newUnavailabilityDates} />}
      {!isLoading &&
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

export default CalendarPicker;
