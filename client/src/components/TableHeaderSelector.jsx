import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
];

const mod = (x, n) => ((x % n) + n) % n;

const TableHeaderSelector = (props) => {
  const { fontSize } = props;

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const prevMonth = () => {
    setSelectedMonth(mod(selectedMonth - 1, 12));
  };

  const nextMonth = () => {
    setSelectedMonth(mod(selectedMonth + 1, 12));
  };

  const prevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const nextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  return (
    <Container fluid="true">
      <Row>
        <IconButton onClick={prevMonth}>
          <ArrowBackIos fontSize={fontSize} />
        </IconButton>
        <h4 className="table-selector-header">{monthNames[selectedMonth]}</h4>
        <IconButton onClick={nextMonth}>
          <ArrowForwardIos fontSize={fontSize} />
        </IconButton>
        <IconButton onClick={prevYear}>
          <ArrowBackIos fontSize={fontSize} />
        </IconButton>
        <h4 className="table-selector-header">{selectedYear}</h4>
        <IconButton onClick={nextYear}>
          <ArrowForwardIos fontSize={fontSize} />
        </IconButton>
        <IconButton>
          <ArrowBackIos fontSize={fontSize} />
        </IconButton>
        <h4 className="table-selector-header">A1 M Seniori</h4>
        <IconButton>
          <ArrowForwardIos fontSize={fontSize} />
        </IconButton>
      </Row>
    </Container>
  );
};

TableHeaderSelector.propTypes = {
  fontSize: PropTypes.string,
};

TableHeaderSelector.defaultProps = {
  fontSize: 'large',
};

export default TableHeaderSelector;
