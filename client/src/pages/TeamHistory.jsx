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

const AccountSettings = (props) => {
  const { user } = props;
  const classes = useStyles();
  return <h1>TeamHistory</h1>;
};

AccountSettings.propTypes = {
  user: PropTypes.string.isRequired,
};

AccountSettings.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
