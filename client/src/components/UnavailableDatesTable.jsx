import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import NiceTable from './NiceTable';

import dateFormatter from '../utils/datemanip';

/* eslint-disable no-unused-vars */
const useStyles = makeStyles((theme) => ({}));

const mapDispatchToProps = (dispatch) => ({});
/* eslint-enable no-unused-vars */

const UnavailableDatesTable = (props) => {
  const {
    loading,
    dates,
    title,
    deletable,
    hasConfirmButton,
    handleDeleteSelected,
    handleConfirmSelected,
  } = props;

  /* eslint-disable no-unused-vars */
  const classes = useStyles();
  /* eslint-enable no-unused-vars */

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
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <NiceTable
          tableName={title}
          rows={dates.map((elem) => ({
            ...elem,
            StartDate: dateFormatter(elem.StartDate),
            EndDate: dateFormatter(elem.EndDate),
          }))}
          headCells={headCells}
          hasConfirmButton={hasConfirmButton}
          handleConfirmSelectedClick={handleConfirmSelected}
          handleDeleteSelectedClick={handleDeleteSelected}
          primaryKey="id"
          acceptsRowSelect={deletable}
          acceptsRowDelete={deletable}
        />
      )}
    </>
  );
};

UnavailableDatesTable.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  dates: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      StartDate: PropTypes.date.isRequired,
      EndDate: PropTypes.string.isRequired,
      Reason: PropTypes.string.isRequired,
    })
  ).isRequired,
  deletable: PropTypes.bool.isRequired,
  hasConfirmButton: PropTypes.bool,
  handleConfirmSelected: PropTypes.func,
  handleDeleteSelected: PropTypes.func,
};

UnavailableDatesTable.defaultProps = {
  loading: false,
  hasConfirmButton: false,
  handleDeleteSelected: null,
  handleConfirmSelected: null,
};

export default connect(mapDispatchToProps)(UnavailableDatesTable);
