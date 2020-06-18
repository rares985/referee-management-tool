import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, InputGroup, FormControl, FormLabel, Card } from 'react-bootstrap';
import { EyeOpenIcon, EyeClosedIcon, LockIcon } from '../components/Icons';

import { LoginAction } from '../actions/index';

const HIDE_PASSWORD_DELAY_MS = 500;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const mapStateToProps = (state) => ({
  logged_user: state.loginPage.logged_user,
  loading: state.loginPage.loading,
  error: state.loginPage.error
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitLoginRequest: (request) => {
    dispatch(LoginAction(request));
  }
});

/* eslint-disable */
const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMasked, setMasked] = useState(true);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const { logged_user, loading, error } = props;

  function handleSubmit(event) {
    event.preventDefault();

    const { onSubmitLoginRequest } = props;

    onSubmitLoginRequest({
      username: username,
      password: password
    });
  }

  useEffect(() => {
    if (logged_user !== '' && !loading && !error) {
      console.log(`Logged in as ${props.logged_user}`);
      props.userCallback(username);
      props.loginCallback(true);
      props.navigate('/account');
    }
  });


  const EyeIcon = (props) => {
    if (props.isMasked) return <EyeClosedIcon />;
    return <EyeOpenIcon />;
  };


  return (

    < div className="page-container" >
      <div className="login">
        <h3> Autentificare </h3>
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="avatar">
              <LockIcon />
            </div>
            <FormGroup controlId="username">
              <FormLabel>username</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormLabel>Password</FormLabel>
            <InputGroup className="mb-3">
              <FormControl
                type={isMasked ? 'password' : 'text'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    /* Invert password mask */
                    setMasked(!isMasked);
                    setTimeout(() => {
                      /* At timeout, forcefully hide password */
                      setMasked(true);
                    }, HIDE_PASSWORD_DELAY_MS);
                  }}
                >
                  <EyeIcon isMasked={isMasked} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <Button block disabled={!validateForm()} type="submit">
              Autentificare
            </Button>
          </form>
        </Card>
      </div>
    </div >
  );
};
/* eslint-enable */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
