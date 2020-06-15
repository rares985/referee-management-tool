import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { Pencil, ArrowUpDown } from '../components/Icons';

const axios = require('axios').create({
    baseURL: process.env.API_ENDPOINT
});

/* eslint-disable */
const MatchTable = (props) => {
    return (
        <Table striped bordered size="sm">
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
                {props.matches.map((match, idx) => {
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
                                <Pencil />
                            </td>
                            <td>
                                <Pencil />
                            </td>
                            <td>
                                <Pencil />
                            </td>
                            <td>
                                {match.location}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
};



const parseMatches = (matches) => {
    return matches.map(match => JSON.parse(match));
}

const ProposeDrafts = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);


    useEffect(() => {
        if (isLoading) {
            axios
                .get('/api/delegablematches', {
                    params: {
                        username: props.authenticatedUser,
                    }
                })
                .then(
                    (response) => {
                        if (response.status === 200) {
                            setIsLoading(false);
                            setMatches(parseMatches(response.data));
                        }
                    },
                    (error) => {
                        console.error(error);
                    }
                );
        }
    });

    return (
        <div className="page-container">
            {isLoading && <Spinner animation="border" />}
            {!isLoading && <MatchTable matches={matches} />}
        </div>
    );
}
/* eslint-enable */
export default ProposeDrafts;