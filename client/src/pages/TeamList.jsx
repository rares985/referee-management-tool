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

const TeamList = (props) => {
  const { user } = props;
  const classes = useStyles();
  return <h1>Team List</h1>;
};

TeamList.propTypes = {
  user: PropTypes.string.isRequired,
};

TeamList.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
