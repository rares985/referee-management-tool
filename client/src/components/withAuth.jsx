import React, {Component} from 'react';
import { Spinner } from 'react-bootstrap';

const axios = require('axios').create({
    baseURL: process.env.API_ENDPOINT
});

const ONE_SECOND_IN_MS = 1000;
const REDIRECT_WAIT_SEC = 3;

/* eslint-disable */
const WithAuth = (ComponentToProtect) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
                redirectTime: REDIRECT_WAIT_SEC,
                message: ''
            };
        }

        componentDidMount() {
            axios
            .get('/checkToken')
            .then(res => {
                if (res.status === 200) {
                    this.setState({loading: false});
                    console.log('WithAuth fetch done');
                }
            })
            .catch(err => {
                console.log(err.response);
                this.setState({message: err.response.data, loading:false, redirect:true});
                this.setState({loading: false, redirect: true});
            })
        }

        render() {
            const { loading, redirect, redirectTime, message } = this.state;
            if (loading) {
                return <></>;
            }
            if (redirect) {
                setInterval(() => {this.setState({redirectTime : redirectTime - 1}) }, ONE_SECOND_IN_MS);
                setTimeout(() => {
                    this.props.navigate('/login')
                }, REDIRECT_WAIT_SEC * ONE_SECOND_IN_MS);
                return (
                    <div className="page-container">
                        <h1>{message}</h1>
                        <h1> Redirecting in {redirectTime}...</h1>
                        <Spinner animation="border" />
                    </div>
                )
            }
            return <ComponentToProtect {...this.props} />
        }
    }
};
/* eslint-enable */

export default WithAuth;