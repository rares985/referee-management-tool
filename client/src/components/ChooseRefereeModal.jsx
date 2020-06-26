import React, { useState } from 'react';

import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { filter } from 'lodash';
import { Pencil } from './Icons';

import removeAccents from '../utils/strmanip';

/* eslint-disable react/prop-types */
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
  const matching = filter(refs, elem => query === "" ? true : removeAccents(elem.referee_name.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <Pencil />
      </Button>

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
/* eslint-enable react/prop-types */
export default ChooseRefereeModal;