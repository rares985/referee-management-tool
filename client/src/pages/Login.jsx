import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, InputGroup, FormControl, FormLabel, Card, Container } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import LockTwoTone from '@material-ui/icons/LockTwoTone';
import { EyeOpenIcon, EyeClosedIcon, LockIcon } from '../components/Icons';

import LoginAction from '../actions/LoginAction';

const HIDE_PASSWORD_DELAY_MS = 500;

const mapStateToProps = (state) => ({
  user: state.login.user,
  finished: state.login.finished,
  loading: state.login.loading,
  error: state.login.error
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitLoginRequest: (request) => {
    dispatch(LoginAction(request));
  }
});

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMasked, setMasked] = useState(true);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const { navigate, user, finished, loading, error, onSubmitLoginRequest } = props;

  function handleSubmit(event) {
    event.preventDefault();

    onSubmitLoginRequest({
      username,
      password
    });
  }

  const EyeIcon = (prps) => {
    const { masked } = prps;
    if (masked) return <EyeClosedIcon />;
    return <EyeOpenIcon />;
  };


  return (
    <div className="login">
      <Container>
        <Typography className="page-title" variant="h4" component="h4">
          Autentificare
        </Typography>
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="avatar">
              <LockTwoTone style={{ fontSize: 60 }} />
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
            <Button variant="info" block disabled={!validateForm()} type="submit">
              Autentificare
            </Button>
          </form>
        </Card>
      </Container>
    </div>
  );
};
/* eslint-enable */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
