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
        <>
            <section>
                <DelegableMatches />
            </section>
            <section>
                <PersonalDrafts />
            </section>
            <section>
                <ProposedDrafts />
            </section>
            <section>
                <RejectedDrafts />
            </section>
        </>
    );
}
/* eslint-enable react/prop-types */
export default Delegate;