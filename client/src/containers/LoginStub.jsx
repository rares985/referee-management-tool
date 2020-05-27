import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel, Card } from "react-bootstrap";

/* eslint-disable */
const LoginStub = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="page-container">
            <div className="login">
                <Card className={props.navOpen ? "active" : ''}>
                    <form onSubmit={handleSubmit}>
                        <div className="avatar">
                            <i className="ion-ios-home" />
                        </div>
                        <FormGroup controlId="email">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <Button block disabled={!validateForm()} type="submit">
                            Login
                    </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginStub;