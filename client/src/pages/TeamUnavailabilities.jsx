/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => {});

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({});

const TeamUnavailabilities = (props) => {
  const { user } = props;
  const classes = useStyles();
  return <h1>TeamUnavailabilities</h1>;
};

TeamUnavailabilities.propTypes = {
  user: PropTypes.string.isRequired,
};

TeamUnavailabilities.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TeamUnavailabilities);
