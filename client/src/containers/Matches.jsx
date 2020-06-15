import { Table, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

const axios = require('axios').create({
    baseURL: process.env.API_ENDPOINT
});

const DummyTable = () => {
    return (
        <Table striped bordered size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    );
}


const Matches = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        if (isLoading) {
            axios
                .get('/api/publicmatches')
                .then(
                    (response) => {
                        setMatches(response.data.map(elem => JSON.parse(elem)));
                        setIsLoading(false);
                    },
                    (error) => {
                        /* eslint-disable no-console */
                        console.error(error);
                        /* eslint-enable no-console */
                        setIsLoading(false);
                    }
                );
        }
    });

    return (
        <div className="page-container">
            {isLoading && <Spinner animation="border" />}
            {!isLoading &&
                <Table striped bordered size="sm">
                    <thead>
                        <tr>
                            <th>Nr. Meci</th>
                            <th>Data desfasurarii</th>
                            <th>Echipa A</th>
                            <th>Echipa B</th>
                            <th>Locatie</th>
                            <th>A1</th>
                            <th>A2</th>
                            <th>Obs</th>
                        </tr>
                    </thead>
                    {matches.map((match) => {
                        const dt = new Date(match.match_date);
                        const dtstr = `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;
                        return (
                            <tbody>
                                <td>
                                    {match.match_no}
                                </td>
                                <td>
                                    {dtstr}
                                </td>
                                <td>
                                    {match.team_a_name}
                                </td>
                                <td>
                                    {match.team_b_name}
                                </td>
                                <td>
                                    {match.location}
                                </td>
                                <td>
                                    null
                                    </td>
                                <td>
                                    null
                                    </td>
                                <td>
                                    null
                                    </td>
                            </tbody>
                        );
                    })}
                </Table>
            }
            <DummyTable />
        </div >
    );
};

export default Matches;