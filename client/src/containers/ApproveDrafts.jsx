import React, { useState, useEffect } from 'react';

const axios = require('axios').create({
    baseURL: process.env.API_ENDPOINT
});


const ApproveDrafts = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get()

    });

    return (
        <div className="page-container">
            <h1>ApproveDrafts</h1>
        </div>
    );
}
