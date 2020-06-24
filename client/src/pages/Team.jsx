import React from 'react';
import { connect } from 'react-redux';


/* eslint-disable no-unused-vars */
const mapStateToProps = (state) => ({
  user: state.login.user
});

const mapDispatchToProps = (dispatch) => ({

});

const TeamPage = (props) => {
  return (
    <>
      <h1> Salwt </h1>
    </>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);