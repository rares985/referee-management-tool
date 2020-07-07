import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

import removeAccents from '../utils/strmanip';

const SearchableDialog = (props) => {
  const [query, setQuery] = useState('');

  const [chosen, setChosen] = useState({});

  const { title, text, searchLabel, open } = props;

  const { onChange, onClose } = props;

  const { refs } = props;

  const handleSaveClose = () => {
    onClose();
    onChange({
      matchId: chosen.match_id,
      refereeId: chosen.referee_id,
      refereeName: chosen.referee_name,
    });
    setQuery('');
    setChosen({});
  };

  const handleChoice = (ref) => {
    setQuery(ref.referee_name);
    setChosen(ref);
  };

  const matching = refs.filter((elem) =>
    query === ''
      ? true
      : removeAccents(elem.referee_name.toLowerCase()).indexOf(
          removeAccents(query.toLowerCase())
        ) !== -1
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={searchLabel}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        <List>
          {matching.map((ref) => {
            return (
              <ListItem autoFocus button key={ref.referee_id} onClick={() => handleChoice(ref)}>
                <ListItemText primary={ref.referee_name} />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Anulează
        </Button>
        <Button onClick={handleSaveClose} variant="contained" color="primary">
          Salvează
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SearchableDialog.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  searchLabel: PropTypes.string.isRequired,
  refs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

SearchableDialog.defaultProps = {
  text: '',
};

export default SearchableDialog;
