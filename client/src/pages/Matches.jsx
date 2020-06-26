import { Table, Spinner } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { FetchMatches } from '../actions/MatchesActions';

import DismissibleHelper from '../components/DismissibleHelper';

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const mapStateToProps = (state) => ({
    matches: state.matches.matches,
    loading: state.matches.loading,
    error: state.matches.error
});

const mapDispatchToProps = (dispatch) => ({
    onFetchMatches: (request) => {
        dispatch(FetchMatches(request));
    }
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


const Matches = (props) => {

    const doFetchMatches = () => {
        const request = { msg: "Dispatched ON_FETCH_MATCHES" };
        const { onFetchMatches } = props;
        onFetchMatches(request);
    };

    const { matches, loading, error } = props;

    useEffect(() => {
        if (loading) {
            doFetchMatches();
        }
    });

    return (
        <div className="page-container">
            {loading && <Spinner animation="border" />}
            {!loading &&
                <>
                    <DismissibleHelper heading="Tip" text="Aici poti vedea delegarile confirmate" />
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
                        <tbody>
                            {matches.map((match) => {
                                const dt = new Date(match.match_date);
                                const dtstr = `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;
                                return (
                                    <tr>
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
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </>
            }
            <DummyTable />
        </div >
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Matches);

/* eslint-enable react/prop-types */
/* eslint-enable no-unused-vars */