import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const HIDE_PASSWORD_DELAY_MS = 750;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 0
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginLeft: 0,
    width: `100%`
  }

}));

const MaskableTextField = (props) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const { value, onChange, fullWidth, required, margin, label, name, id, error } = props;

  const handleClickShowPassword = () => {
    setVisible(!visible);
    setTimeout(() => {
      /* At timeout, forcefully hide password */
      setVisible(false);
    }, HIDE_PASSWORD_DELAY_MS);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  return (
    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        className={clsx(classes.input)}
        type={visible ? 'text' : 'password'}
        margin={margin}
        required={required}
        fullWidth={fullWidth}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormControl>
  );
}

MaskableTextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  margin: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.bool,
}

MaskableTextField.defaultProps = {
  fullWidth: true,
  required: true,
  error: false,
};

export default MaskableTextField;