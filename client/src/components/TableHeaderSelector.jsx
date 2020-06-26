import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';

const monthNames = [
  'Ianuarie',
  'Februarie',
  'Martie',
  'Aprilie',
  'Mai',
  'Iunie',
  'Iulie',
  'August',
  'Septembrie',
  'Octombrie',
  'Noiembrie',
  'Decembrie',
]

const mod = (x, n) => (x % n + n) % n;



// eslint-disable-next-line no-unused-vars
const TableHeaderSelector = (props) => {

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const prevMonth = () => {
    setSelectedMonth(mod(selectedMonth - 1, 12));
  }

  const nextMonth = () => {
    setSelectedMonth(mod(selectedMonth + 1, 12));
  }

  const prevYear = () => {
    setSelectedYear(selectedYear - 1);
  }

  const nextYear = () => {
    setSelectedYear(selectedYear + 1);
  }

  return (
    <Container fluid>
      <Row>
        <IconButton onClick={prevMonth}>
          <ArrowBackIos fontSize="large" />
        </IconButton>
        <h4 className="table-selector-header">{monthNames[selectedMonth]}</h4>
        <IconButton onClick={nextMonth}>
          <ArrowForwardIos fontSize="large" />
        </IconButton>
        <IconButton onClick={prevYear}>
          <ArrowBackIos fontSize="large" />
        </IconButton>
        <h4 className="table-selector-header">{selectedYear}</h4>
        <IconButton onClick={nextYear}>
          <ArrowForwardIos fontSize="large" />
        </IconButton >
        <IconButton>
          <ArrowBackIos fontSize="large" />
        </IconButton>
        <h4 className="table-selector-header">A1 M Seniori</h4>
        <IconButton>
          <ArrowForwardIos fontSize="large" />
        </IconButton>
      </Row>
    </Container>
  );
}

export default TableHeaderSelector;