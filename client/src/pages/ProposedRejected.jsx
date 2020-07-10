import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import ProposedDrafts from './proposed/ProposedDrafts';
import RejectedDrafts from './proposed/RejectedDrafts';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));

const Proposed = () => {
  const classes = useStyles();

  const pages = [<ProposedDrafts />, <RejectedDrafts />];

  return (
    <Container component="main" className={classes.container}>
      <CssBaseline>
        {pages.map((page) => {
          return (
            <Paper elevation={4} className={classes.paper}>
              {page}
            </Paper>
          );
        })}
      </CssBaseline>
    </Container>
  );
};

export default Proposed;
