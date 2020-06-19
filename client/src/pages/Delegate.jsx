import React from 'react';

import DelegableMatches from './delegate/DelegableMatches';
import ProposedDrafts from './delegate/ProposedDrafts';
import RejectedDrafts from './delegate/RejectedDrafts';

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
const Delegate = (props) => {





    return (
        <div className="page-container">
            <h1> Meciuri delegabile</h1>
            <DelegableMatches />
            <h1> Propuneri trimise spre aprobare</h1>
            <ProposedDrafts />
            <h1> Propuneri respinse </h1>
            <RejectedDrafts />
        </div >
    );
}
/* eslint-enable react/prop-types */
export default Delegate;