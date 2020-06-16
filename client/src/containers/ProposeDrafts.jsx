/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Table, Spinner, Modal, Button, ListGroup, Form } from 'react-bootstrap';
import { Pencil, ArrowUpDown } from '../components/Icons';
import { groupBy, filter } from 'lodash';

const axios = require('axios').create({
    baseURL: process.env.API_ENDPOINT
});


const ChooseRefereeModal = (props) => {
    const [show, setShow] = useState(false);
    const [chosen, setChosen] = useState({});
    const [query, setQuery] = useState('');

    const handleClose = () => setShow(false);
    const handleSaveClose = () => {
        props.onSaveCloseCB(chosen);
        handleClose();
    }

    const handleShow = () => setShow(true);

    const removeAccents = (str) => {
        const accent_map = { 'a': 'ă|â', 'i': 'î', 's': 'ș', 't': 'ț' }
        for (var pattern in accent_map) {
            str = str.replace(new RegExp(accent_map[pattern], 'g'), pattern);
        }
        return str;
    }

    let shortlist_match = props.shortlist[props.matchid];
    let refs = shortlist_match.map(elem => elem.referee);
    const matching = filter(refs, elem => query === "" ? true : removeAccents(elem.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1);

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

                        {matching.map((ref, idx) => {
                            return (
                                <ListGroup.Item action onClick={() => setChosen(ref)}>
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

const ProposeDrafts = (props) => {
    const [state, setState] = useState({
        isLoading: true,
        matches: [],
        shortlist: []
    })
    // const [delegated, setDelegated] = useState([]);
    // const [delegations, setDelegations] = useState([]);


    useEffect(() => {
        if (state.isLoading) {
            axios
                .get('/api/delegablematches', {
                    params: {
                        username: props.authenticatedUser
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        console.log(response);
                        const matches = response.data.map(elem => JSON.parse(elem));
                        axios
                            .get('/api/eligiblefordelegable', {
                                params: {
                                    username: props.authenticatedUser
                                }
                            })
                            .then(response => {
                                if (response.status === 200) {
                                    console.log(response);
                                    const shortlist = groupBy(response.data.map(elem => JSON.parse(elem)), elem => elem.id);
                                    setState({
                                        isLoading: false,
                                        matches: matches,
                                        shortlist: shortlist
                                    });
                                }
                            })
                            .catch(error => {
                                console.error(error);
                                setState({
                                    isLoading: false
                                });
                            })
                    }
                })
                .catch(error => {
                    console.error(error);
                    setState({
                        isLoading: false
                    })
                })
        }
    });


    return (
        <div className="page-container">
            {state.isLoading && <Spinner animation="border" />}
            {!state.isLoading && <Table striped bordered size="sm">
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
                    {state.matches.map((match, idx) => {
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
                                    <ChooseRefereeModal shortlist={state.shortlist} matchid={match.id} onSaveCloseCB={(ref) => console.log(ref)} />
                                </td>
                                <td>
                                    <ChooseRefereeModal shortlist={state.shortlist} matchid={match.id} onSaveCloseCB={(ref) => console.log(ref)} />
                                </td>
                                <td>
                                    <ChooseRefereeModal shortlist={state.shortlist} matchid={match.id} onSaveCloseCB={(ref) => console.log(ref)} />
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