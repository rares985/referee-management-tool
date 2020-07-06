import React from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const Selector = (props) => {
  const { choices, value, setValue, allowChange, label } = props;

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="select-outlined">{label}</InputLabel>
      <Select
        labelId="select-outlined"
        id="select-outlined"
        value={value}
        readOnly={!allowChange}
        onChange={(e) => setValue(e.target.value)}
        label="Categorie"
      >
        {choices.map((choice) => {
          return (
            <MenuItem value={choice} key={choice}>
              {choice}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

Selector.propTypes = {
  label: PropTypes.string.isRequired,
  choices: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  allowChange: PropTypes.bool,
};

Selector.defaultProps = {
  allowChange: false,
};

export default Selector;
