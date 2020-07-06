import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import { filter } from 'lodash';

import removeAccents from '../utils/strmanip';

const ChooseRefereeModal = (props) => {
  const [show, setShow] = useState(false);
  /* eslint-disable no-unused-vars */
  const [chosen, setChosen] = useState({});
  const [query, setQuery] = useState('');
  /* eslint-enable no-unused-vars */

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleChoice = (ref) => {
    setQuery(ref.referee_name);
    setChosen(ref);
  };

  const handleSaveClose = () => {
    props.onSaveCloseCB(chosen);
    handleClose();
  };

  const { shortlist, text, title } = props;

  const refs = shortlist.map((elem) => ({
    referee_name: elem.referee_name,
    referee_id: elem.referee_id,
  }));
  /* eslint-disable no-unused-vars */
  const matching = filter(refs, (elem) =>
    query === ''
      ? true
      : removeAccents(elem.referee_name.toLowerCase()).indexOf(
          removeAccents(query.toLowerCase())
        ) !== -1
  );
  /* eslint-enable no-unused-vars */

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <CreateIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={show}
        onClose={handleClose}
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
            label="Nume arbitru"
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
          <Button onClick={handleClose} variant="contained" color="primary">
            Anulează
          </Button>
          <Button onClick={handleSaveClose} variant="contained" color="primary">
            Salvează
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ChooseRefereeModal.propTypes = {
  shortlist: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  text: PropTypes.string,
  title: PropTypes.string.isRequired,
  onSaveCloseCB: PropTypes.func.isRequired,
};

ChooseRefereeModal.defaultProps = {
  text: '',
};

export default ChooseRefereeModal;
