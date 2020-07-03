import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker } from '@material-ui/pickers';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
  },
}));

const DateAdder = (props) => {
  const classes = useStyles();
  const { onAdd } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [error, setError] = useState(false);

  const handleAddNewDate = (event) => {
    event.preventDefault();

    console.log(`Reason=<${reason}>`);
    if (reason === '') {
      setError(true);
      return;
    }

    onAdd({
      startDate,
      endDate,
      reason,
    });
    setReason('');
    setError(false);
  };

  return (
    <form onSubmit={handleAddNewDate} className={classes.root}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Data începerii"
        format="MM/dd/yyyy"
        value={startDate}
        onChange={setStartDate}
        KeyboardButtonProps={{
          'aria-label': 'change start date',
        }}
      />
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Data încheierii"
        format="MM/dd/yyyy"
        value={endDate}
        onChange={setEndDate}
        KeyboardButtonProps={{
          'aria-label': 'change end date',
        }}
      />
      <TextField
        autoFocus
        variant="outlined"
        margin="normal"
        type="text"
        size="small"
        label="Motiv"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        error={error}
        helperText={error ? 'Trebuie să specificați un motiv' : ''}
        readOnly
      />

      <Button variant="contained" color="primary" block="true" type="submit">
        Adaugă
      </Button>
    </form>
  );
};

DateAdder.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default DateAdder;
