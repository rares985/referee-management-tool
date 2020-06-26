import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner, Table, Button, Container } from 'react-bootstrap';

import { XIcon } from '../components/Icons';
import TableHeaderSelector from '../components/TableHeaderSelector';

/* eslint-disable react/prop-types */
import FetchApprovableDrafts from '../actions/approve/approveDraftsActions';

import dateFormatter from '../utils/datemanip';




const mapStateToProps = (state) => ({
    user: state.login.user,
    drafts: state.approvable.drafts,
    draftsLoading: state.approvable.draftsLoading,
});

const mapDispatchToProps = (dispatch) => ({
    DoFetchDrafts: (request) => {
        dispatch(FetchApprovableDrafts(request));
    },
});


const ApproveDrafts = (props) => {
    const { user, drafts, draftsLoading } = props;

    useEffect(() => {
        const { DoFetchDrafts } = props;
        if (draftsLoading) {
            DoFetchDrafts({
                username: user
            })
        }
    }, [draftsLoading])

    return (
        <div className="page-container">
            <Container fluid>
                {draftsLoading && <Spinner animation="border" />}
                {!draftsLoading &&
                    <>
                        <TableHeaderSelector />
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Data</th>
                                    <th>Echipa A</th>
                                    <th>Echipa B</th>
                                    <th>Locatie</th>
                                    <th>A1</th>
                                    <th>A2</th>
                                    <th>Observator</th>
                                    <th>Competitie</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    drafts.map((match) => {
                                        return (
                                            <tr key={match.id}>
                                                <td>{match.match_no}</td>
                                                <td>{dateFormatter(match.match_date)}</td>
                                                <td>{match.team_a_name}</td>
                                                <td>{match.team_b_name}</td>
                                                <td>{match.location}</td>
                                                <td>{match.first_referee_name}<Button><XIcon /></Button></td>
                                                <td>{match.second_referee_name}<Button><XIcon /></Button></td>
                                                <td>{match.observer_name}</td>
                                                <td>{match.full_name_competition}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                    </>
                }
            </Container>
        </div>
    );
}
/* eslint-enable */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApproveDrafts);
