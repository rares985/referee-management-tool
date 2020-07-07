import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import SearchableDialog from './SearchableDialog';

const TextFieldPicker = (props) => {
  const { refs, value, onChange } = props;
  const { margin, variant, dialogTitle, dialogSearchLabel } = props;
  const [open, setOpen] = useState(false);

  const handleDialogChoice = (val) => {
    setOpen(false);
    onChange(val);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TextField
        value={value}
        InputProps={{
          readOnly: true,
        }}
        onClick={() => setOpen(true)}
        margin={margin}
        variant={variant}
      />
      <SearchableDialog
        onChange={handleDialogChoice}
        onClose={handleDialogClose}
        open={open}
        title={dialogTitle}
        searchLabel={dialogSearchLabel}
        refs={refs}
      />
    </>
  );
};

TextFieldPicker.propTypes = {
  value: PropTypes.string.isRequired,
  refs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  margin: PropTypes.oneOf(['dense', 'normal']),
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  dialogSearchLabel: PropTypes.string,
  dialogTitle: PropTypes.string,
};

TextFieldPicker.defaultProps = {
  margin: 'dense',
  variant: 'outlined',
  dialogTitle: 'Alege arbitru',
  dialogSearchLabel: 'Nume',
};

export default TextFieldPicker;
