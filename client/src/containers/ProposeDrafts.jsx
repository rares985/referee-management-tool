/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Table, Spinner, Modal, Button, ListGroup, Form } from 'react-bootstrap';
import { Pencil, ArrowUpDown } from '../components/Icons';
import { groupBy, filter } from 'lodash';

const axios = require('axios').create({
    baseURL: process.env.API_ENDPOINT
});

const removeAccents = (str) => {
    const accent_map = { 'a': 'ă|â', 'i': 'î', 's': 'ș', 't': 'ț' }
    for (var pattern in accent_map) {
        str = str.replace(new RegExp(accent_map[pattern], 'g'), pattern);
    }
    return str;
}


const addUpdateArray = (arr, matchid, key, value) => {
    const idx = arr.findIndex(elem => elem.matchid === matchid);
    let new_arr = [];
    let new_elem = {};

    if (idx !== -1) {
        /* Yes, element already in array, just update specified key */
        new_elem = { ...arr[idx] };
        new_elem[key] = value;

        new_arr = [...arr.slice(0, idx), new_elem, ...arr.slice(idx + 1, arr.length)];
    } else {
        /* No, element not in array */
        new_elem["matchid"] = matchid;
        new_elem[key] = value;
        new_arr = [...arr, new_elem]
    }
    return new_arr;
}



const ChooseRefereeModal = (props) => {
    const [show, setShow] = useState(false);
    const [chosen, setChosen] = useState({});
    const [query, setQuery] = useState('');

    const handleClose = () => setShow(false);
    const handleSaveClose = () => {
        props.onSaveCloseCB(props.matchid, chosen);
        handleClose();
    }

    const handleShow = () => setShow(true);

    let shortlist_match = props.shortlist[props.matchid];
    let refs = shortlist_match.map(elem => ({ "referee": elem.referee, "refid": elem.refid }));
    const matching = filter(refs, elem => query === "" ? true : removeAccents(elem.referee.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1);

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
                                <ListGroup.Item key={ref.refid} action onClick={() => setChosen(ref)}>
                                    {ref.referee}
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
    });
    const [delegated, setDelegated] = useState([]);
    const [delegations, setDelegations] = useState([]);


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
                        const matches = response.data.map(elem => JSON.parse(elem));
                        axios
                            .get('/api/eligiblefordelegable', {
                                params: {
                                    username: props.authenticatedUser
                                }
                            })
                            .then(response => {
                                if (response.status === 200) {
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

    const OnRefSelectedA1 = (matchid, ref) => {
        console.log(`Selected ${ref.referee} for ${matchid} as A1`);

        const new_delegations = addUpdateArray(delegations, matchid, "a1", ref);
        console.log(new_delegations);
        setDelegations(new_delegations);
    }
    const OnRefSelectedA2 = (matchid, ref) => {
        console.log(`Selected ${ref.referee} for ${matchid} as A2`);
        const new_delegations = addUpdateArray(delegations, matchid, "a2", ref);
        console.log(new_delegations);
        setDelegations(new_delegations);
    }
    const OnRefSelectedObs = (matchid, ref) => {
        console.log(`Selected ${ref.referee} for ${matchid} as Observer`);
        const new_delegations = addUpdateArray(delegations, matchid, "Obs", ref);
        console.log(new_delegations);
        setDelegations(new_delegations);
    }

    const GetRefereeName = (matchid, pos) => {
        const idx = delegations.findIndex(elem => elem.matchid === matchid);
        if (idx !== -1) {
            if (delegations[idx].hasOwnProperty(pos)) {
                return delegations[idx][pos].referee;
            }
        }
        return 'Arbitru nedelegat';
    }

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
                            <tr key={match.id}>
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
                                    {GetRefereeName(match.id, "a1")}
                                    <ChooseRefereeModal shortlist={state.shortlist} matchid={match.id} onSaveCloseCB={OnRefSelectedA1} />
                                </td>
                                <td>
                                    {GetRefereeName(match.id, "a2")}
                                    <ChooseRefereeModal shortlist={state.shortlist} matchid={match.id} onSaveCloseCB={OnRefSelectedA2} />
                                </td>
                                <td>
                                    {GetRefereeName(match.id, "Obs")}
                                    <ChooseRefereeModal shortlist={state.shortlist} matchid={match.id} onSaveCloseCB={OnRefSelectedObs} />
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