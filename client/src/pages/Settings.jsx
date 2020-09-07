/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => {});

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({});

const Settings = (props) => {
  const { user } = props;
  const classes = useStyles();
  return (
    <Container>
      <h1> Settings </h1>
    </Container>
  );
};

Settings.propTypes = {
  user: PropTypes.bool.isRequired,
};

Settings.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
