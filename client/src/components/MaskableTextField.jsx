import { InputAdornment } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const HIDE_PASSWORD_DELAY_MS = 500;

const MaskableTextField = (props) => {
  const [isMasked, setMasked] = useState(true);
  const { classes } = props;

  return (
    <TextField
      type={isMasked ? 'password' : 'text'}
      /* eslint-disable react/jsx-props-no-spreading */
      {...classes}
      /* eslint-enable react/jsx-props-no-spreading */
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Vedeti parola"
              onClick={() => {
                /* Invert password mask */
                setMasked(!isMasked);
                setTimeout(() => {
                  /* At timeout, forcefully hide password */
                  setMasked(true);
                }, HIDE_PASSWORD_DELAY_MS);
              }}
            >
              {isMasked ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

MaskableTextField.propTypes = {
  classes: PropTypes.shape({
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.arrayOf]),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default MaskableTextField;
