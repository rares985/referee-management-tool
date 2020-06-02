import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, FormControl, FormLabel, Card } from 'react-bootstrap';
import {EyeOpenIcon, EyeClosedIcon, LockIcon} from '../components/Icons';

const axios = require('axios').create({
  baseURL: 'http://localhost:5001',
});

const HIDE_PASSWORD_DELAY_MS = 500;

/* eslint-disable */
const LoginStub = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMasked, setMasked] = useState(true);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post('/api/authenticate', {
        username: username,
        password: password,
      })
      .then(
        (response) => {
          if (response.status == 200) {
            console.log(`Setting user to ${username}`);
            props.userCallback(username);
            props.loginCallback(true);
            props.navigate('/account');
          }
        },
        (error) => {
          if (error.response) {
            if (error.response.status === 401) {
              alert('Login failure. Please try again');
            }
          }
        }
      );
  }



  const EyeIcon = (props) => {
    if (props.isMasked) return <EyeClosedIcon />;
    return <EyeOpenIcon />;
  };

  return (
    <div className="page-container">
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
    </div>
  );
};
/* eslint-enable */

export default LoginStub;
