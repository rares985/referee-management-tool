import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, FormControl, FormLabel, Card } from "react-bootstrap";

const axios = require('axios').create({
    baseURL: 'http://localhost:5001'
});

/* eslint-disable */
const LoginStub = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isMasked, setMasked] = useState(true);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log()

        axios.post('/api/authenticate',{
            username: username,
            password: password
        })
        .then((response) => {
            alert(response.data);
        })
    }

    const EyeOpenIcon = () => {
        return (
            <svg className="bi bi-eye-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path fillRule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
        )
    }

    const EyeClosedIcon = () => {
        return (
            <svg className="bi bi-eye-slash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z" />
                <path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" />
            </svg>
        )
    }

    const EyeIcon = (props) => {
        if (props.isMasked)
            return <EyeClosedIcon />
        return <EyeOpenIcon />
    }


    const LockIcon = () => {
        return (
            <svg className="bi bi-lock-fill" width="3em" height="3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <rect width="11" height="9" x="2.5" y="7" rx="2" />
                <path fillRule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z" />
            </svg>
        )
    }
    return (
        <div className="page-container">
            <div className="login">
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
                                onChange={e => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormLabel>Password</FormLabel>
                        <InputGroup className="mb-3">
                            <FormControl
                                type={isMasked ? 'password' : 'text'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary"
                                    onClick={() => setMasked(!isMasked)}>
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

export default LoginStub;