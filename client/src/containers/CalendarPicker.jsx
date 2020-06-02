import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel, Table } from 'react-bootstrap';

const CalendarPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [unavailabilityDates, setUnavailabilityDates] = useState([]);

  const validateForm = () => {
    // return startDate >= Date.now() && endDate >= Date.now() && startDate <= endDate;
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUnavailabilityDates([
      ...unavailabilityDates,
      {
        start: startDate,
        end: endDate,
      },
    ]);
  };

  return (
    <div className="page-container">
      <h2>Perioade de indisponibilitate</h2>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Data începerii</th>
            <th>Data încheierii</th>
          </tr>
        </thead>
        <tbody>
          {unavailabilityDates.map((item, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{item.start.toString()}</td>
                <td>{item.end.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
    </div>
  );
};

export default CalendarPicker;
