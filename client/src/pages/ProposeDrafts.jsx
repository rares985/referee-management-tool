/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Table, Spinner, Modal, Button, ListGroup, Form } from 'react-bootstrap';
import { Pencil, ArrowUpDown } from '../components/Icons';
import { groupBy, filter } from 'lodash';

import { FetchDelegableMatches, FetchEligibleRefs } from '../actions/index';


const mapStateToProps = (state) => ({
    user: state.login.logged_user,
    matches: state.drafts.matches,
    shortlist: state.drafts.shortlist,
    matchesLoading: state.drafts.matchesLoading,
    shortlistLoading: state.drafts.shortlistLoading,
    error: state.drafts.error
});

const mapDispatchToProps = (dispatch) => ({
    doFetchDelegableMatches: (request) => {
        dispatch(FetchDelegableMatches(request));
    },
    doFetchEligibleRefs: (request) => {
        dispatch(FetchEligibleRefs(request));
    },
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
    const [delegated, setDelegated] = useState([]);
    const [delegations, setDelegations] = useState([]);

    const { user, matches, shortlist, matchesLoading, shortlistLoading, error } = props;


    useEffect(() => {
        const { doFetchDelegableMatches, doFetchEligibleRefs } = props;
        if (matchesLoading && user !== '') {
            doFetchDelegableMatches({
                username: user
            })
        }
        if (shortlistLoading) {
            doFetchEligibleRefs({
                username: user
            })
        }
    });

    const OnRefSelectedA1 = (matchid, ref) => {
        const new_delegations = addUpdateArray(delegations, matchid, "a1", ref);
        setDelegations(new_delegations);
    }
    const OnRefSelectedA2 = (matchid, ref) => {
        const new_delegations = addUpdateArray(delegations, matchid, "a2", ref);
        setDelegations(new_delegations);
    }
    const OnRefSelectedObs = (matchid, ref) => {
        const new_delegations = addUpdateArray(delegations, matchid, "Obs", ref);
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

    const handleDelegationSubmit = (event) => {
        event.preventDefault();
        let formatted = delegations.map(elem => ({
            "created_by": props.userid,
            "first_referee_id": elem.a1.refid,
            "second_referee_id": elem.a2.refid,
            "observer_id": elem.Obs.refid,
            "match_id": elem.matchid
        }));

        // axios
        //     .post("/api/drafts", {
        //         matches: formatted
        //     })
        //     .then(response => {
        //         if (response.status === 200) {
        //             console.log('OK, drafts posted');
        //         }
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });

        console.log(formatted);
    }

    const shortlist_by_id = groupBy(shortlist, elem => elem.id);
    return (
        <div className="page-container">
            {matchesLoading && <Spinner animation="border" />}
            {!matchesLoading && <Table striped bordered size="sm">
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
                                    {!shortlistLoading &&
                                        <ChooseRefereeModal shortlist={shortlist_by_id} matchid={match.id} onSaveCloseCB={OnRefSelectedA1} />
                                    }
                                </td>
                                <td>
                                    {GetRefereeName(match.id, "a2")}
                                    {!shortlistLoading &&
                                        <ChooseRefereeModal shortlist={shortlist_by_id} matchid={match.id} onSaveCloseCB={OnRefSelectedA2} />
                                    }
                                </td>
                                <td>
                                    {GetRefereeName(match.id, "Obs")}
                                    {!shortlistLoading &&
                                        <ChooseRefereeModal shortlist={shortlist_by_id} matchid={match.id} onSaveCloseCB={OnRefSelectedObs} />
                                    }
                                </td>
                                <td>
                                    {match.location}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>}
            {!matchesLoading &&
                <Button onClick={handleDelegationSubmit}>
                    Trimite pentru aprobare
            </Button>
            }
        </div>
    );
}
/* eslint-enable */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProposeDrafts);