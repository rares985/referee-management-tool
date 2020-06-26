import React from 'react';

// eslint-disable-next-line no-unused-vars
import DelegableMatches from './delegate/DelegableMatches';
// eslint-disable-next-line no-unused-vars
import ProposedDrafts from './delegate/ProposedDrafts';
// eslint-disable-next-line no-unused-vars
import RejectedDrafts from './delegate/RejectedDrafts';
import PersonalDrafts from './delegate/PersonalDrafts';

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
const Delegate = (props) => {
    return (
        <div className="page-container">
            <section>
                <h1> Meciuri delegabile</h1>
                <DelegableMatches />
            </section>
            <section>
                <h1> În lucru (ciorne) </h1>
                <PersonalDrafts />
            </section>
            <section>
                <h1> Propuneri trimise spre aprobare</h1>
                <ProposedDrafts />
            </section>
            <section>
                <h1> Propuneri respinse </h1>
                <RejectedDrafts />
            </section>
        </div >
    );
}
/* eslint-enable react/prop-types */
export default Delegate;