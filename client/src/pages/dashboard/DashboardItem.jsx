/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
  },
  elements: {
    paddingTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const DashboardItem = (props) => {
  const { icon, title, text, buttonLabel, onClick } = props;

  const classes = useStyles();

  return (
    <Paper elevation={4} className={classes.root}>
      <div className={classes.avatar}>{icon}</div>
      <Typography className={classes.elements} component="h1" variant="h5">
        {title}
      </Typography>
      <Typography className={classes.elements} variant="body1" color="textSecondary" component="p">
        {text}
      </Typography>
      <Button className={classes.button} variant="contained" color="primary" onClick={onClick}>
        {buttonLabel}
      </Button>
    </Paper>
  );
};

DashboardItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DashboardItem;
