import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import { filter } from 'lodash';

import removeAccents from '../utils/strmanip';


const ChooseRefereeModal = (props) => {
  const [show, setShow] = useState(false);
  const [chosen, setChosen] = useState({});
  const [query, setQuery] = useState('');

  const handleClose = () => setShow(false);
  const handleSaveClose = () => {
    props.onSaveCloseCB(props.matchid, chosen);
    handleClose();
  }

  const { shortlist, matchid } = props;

  const handleShow = () => setShow(true);

  const shortlistMatch = shortlist[matchid];
  const refs = shortlistMatch.map(elem => ({ "referee_name": elem.referee_name, "referee_id": elem.referee_id }));
  const matching = filter(refs,
    elem => query === "" ?
      true :
      removeAccents(elem.referee_name.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1);

  return (
    <>
      <IconButton onClick={handleShow}>
        <CreateIcon fontSize="small" />
      </IconButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alege arbitru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            autoFocus
            className="mb-3"
            type="text"
            placeholder="Cauta arbitru..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ListGroup>

            {matching.map((ref) => {
              return (
                <ListGroup.Item key={ref.referee_id} action onClick={() => setChosen(ref)}>
                  {ref.referee_name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Închide
                        </Button>
          <Button variant="primary" onClick={handleSaveClose}>
            Salvează
                        </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

ChooseRefereeModal.propTypes = {
  shortlist: PropTypes.arrayOf(PropTypes.exact({
    referee_name: PropTypes.string.isRequired,
    referee_id: PropTypes.number.isRequired
  })).isRequired,
  onSaveCloseCB: PropTypes.func.isRequired,
  matchid: PropTypes.number.isRequired,
};

export default ChooseRefereeModal;