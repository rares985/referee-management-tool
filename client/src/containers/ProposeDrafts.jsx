/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Table, Spinner, Modal, Button, ListGroup, Form } from 'react-bootstrap';
import { Pencil, ArrowUpDown } from '../components/Icons';
import { groupBy } from 'lodash';

const axios = require('axios').create({
    baseURL: process.env.API_ENDPOINT
});


const ChooseRefereeModal = (props) => {
    const [show, setShow] = useState(false);
    const [chosen, setChosen] = useState({});

    const handleClose = () => setShow(false);
    const handleSaveClose = () => {
        props.onSaveCloseCB(chosen);
        handleClose();
    }

    const handleShow = () => setShow(true);

    let shortlist_match = props.shortlist[props.matchid];
    let refs = shortlist_match.map(elem => elem.referee);

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
                    <Form.Control className="mb-3" type="text" placeholder="Cauta" />
                    <ListGroup>
                        {refs.map((ref, idx) => {
                            return (
                                <ListGroup.Item action onClick={(idx) => setChosen(refs[idx])}>
                                    {ref}
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

const parseMatches = (matches) => {
    return matches.map(match => JSON.parse(match));
}

const ProposeDrafts = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [delegated, setDelegated] = useState([]);
    const [delegations, setDelegations] = useState([]);
    const [shortlist, setShortlist] = useState([]);


    useEffect(() => {
        if (isLoading) {
            axios
                .get('/api/delegablematches', {
                    params: {
                        username: props.authenticatedUser
                    }
                })
                .then(
                    (response) => {
                        if (response.status === 200) {
                            let matches = parseMatches(response.data);
                            axios
                                .get('/api/eligiblefordelegable', {
                                    params: {
                                        username: props.authenticatedUser
                                    }
                                })
                                .then(
                                    (response) => {
                                        if (response.status === 200) {
                                            let grouped = _.groupBy(response.data.map(elem => JSON.parse(elem)), elem => elem.id)
                                            setShortlist(grouped);
                                            setMatches(matches);
                                            setIsLoading(false);
                                        }
                                    },
                                    (error) => {
                                        console.error(error);
                                        setIsLoading(false);
                                    }
                                )
                        }
                    },
                    (error) => {
                        console.error(error);
                        setIsLoading(false);
                    }
                )
        }
    });


    return (
        <div className="page-container">
            {isLoading && <Spinner animation="border" />}
            {!isLoading && <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Data</th>
                        <th>Echipa A <ArrowUpDown /> </th>
                        <th>Echipa B <ArrowUpDown /></th>
                        <th>Competitie <ArrowUpDown /></th>
                        <th>A1</th>
                        <th>A2</th>
                        <th>Obs</th>
                        <th>Locație </th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match, idx) => {
                        const d = new Date(match.match_date);
                        const dstr = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
                        return (
                            <tr>
                                <td>
                                    {match.match_no}
                                </td>
                                <td>
                                    {dstr}
                                </td>
                                <td>
                                    {match.team_a_name}
                                </td>
                                <td>
                                    {match.team_b_name}
                                </td>
                                <td>
                                    {match.competition}
                                </td>
                                <td>
                                    <ChooseRefereeModal shortlist={shortlist} matchid={match.id} onSaveCloseCB={(ref) => console.log(ref)} />
                                </td>
                                <td>
                                    <ChooseRefereeModal shortlist={shortlist} matchid={match.id} onSaveCloseCB={(ref) => console.log(ref)} />
                                </td>
                                <td>
                                    <ChooseRefereeModal shortlist={shortlist} matchid={match.id} onSaveCloseCB={(ref) => console.log(ref)} />
                                </td>
                                <td>
                                    {match.location}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>}
        </div>
    );
}
/* eslint-enable */
export default ProposeDrafts;