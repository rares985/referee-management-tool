import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import DelegableMatches from './delegate/DelegableMatches';
import ProposedDrafts from './delegate/ProposedDrafts';
import RejectedDrafts from './delegate/RejectedDrafts';
import PersonalDrafts from './delegate/PersonalDrafts';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(4),
    }
}));

const Delegate = () => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <CssBaseline>
                <Paper elevation={4} className={classes.paper}>
                    <DelegableMatches />
                </Paper>
                <Paper elevation={4} className={classes.paper}>
                    <PersonalDrafts />
                </Paper>
                <Paper elevation={4} className={classes.paper}>
                    <ProposedDrafts />
                </Paper>
                <Paper elevation={4} className={classes.paper}>
                    <RejectedDrafts />
                </Paper>
            </CssBaseline>
        </Container>
    );
}
export default Delegate;