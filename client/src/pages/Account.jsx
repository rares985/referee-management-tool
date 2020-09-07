/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => {});

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({});

const Account = (props) => {
  const { user } = props;
  const classes = useStyles();
  return <h1>Hello</h1>;
};

Account.propTypes = {
  user: PropTypes.bool.isRequired,
};

Account.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
