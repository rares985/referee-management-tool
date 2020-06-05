import React, { useState, useEffect } from 'react';

const axios = require('axios').create({
    baseURL: process.env.API_ENDPOINT
});


const ProposeDrafts = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

    });

    return (
        <div className="page-container">
            <h1>ProposeDrafts</h1>
        </div>
    );
}

export default ProposeDrafts;