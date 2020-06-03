import React, {Component} from 'react';
import navigate from '@reach/router';

const axios = require('axios').create({
    baseURL: process.env.API_ENDPOINT
});


/* eslint-disable */
const WithAuth = (ComponentToProtect) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false
            };
        }

        componentDidMount() {
            axios
            .get('/checkToken')
            .then(res => {
                if (res.status === 200) {
                    this.setState({loading: false});
                    console.log('WithAuth fetch done');
                } else {
                    const error = new Error(res.error);
                    console.log(error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({loading: false, redirect: true});
            })
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                navigate('/login');
                return null;
            }
            return <ComponentToProtect {...this.props} />
        }
    }
};
/* eslint-enable */

export default WithAuth;