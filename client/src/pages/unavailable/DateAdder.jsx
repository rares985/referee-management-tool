import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker } from '@material-ui/pickers';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  customGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  gridContent: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
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
    <form onSubmit={handleAddNewDate}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog-start"
            label="Data începerii"
            format="dd/MM/yyyy"
            value={startDate}
            onChange={setStartDate}
            KeyboardButtonProps={{
              'aria-label': 'change start date',
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog-end"
            label="Data încheierii"
            format="dd/MM/yyyy"
            value={endDate}
            onChange={setEndDate}
            KeyboardButtonProps={{
              'aria-label': 'change end date',
            }}
          />
        </Grid>
        <Grid item xs={3} className={classes.customGrid}>
          <FormControl className={classes.gridContent} fullWidth error={error}>
            <InputLabel id="demo-simple-select-outlined-label">Motiv</InputLabel>
            <Select value={reason} onChange={(e) => setReason(e.target.value)} label="Motiv">
              <MenuItem value="Suspendat">Suspendat</MenuItem>
              <MenuItem value="Indisponibil">Indisponibil</MenuItem>
            </Select>
            {error && <FormHelperText>Trebuie să specificați un motiv</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={3} className={classes.customGrid}>
          <Button
            className={classes.gridContent}
            variant="contained"
            color="primary"
            block="true"
            type="submit"
          >
            Adaugă
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

DateAdder.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default DateAdder;
