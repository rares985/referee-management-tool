import React from 'react';
import Container from '@material-ui/core/Container';

import DelegableMatches from './delegate/DelegableMatches';
import ProposedDrafts from './delegate/ProposedDrafts';
import RejectedDrafts from './delegate/RejectedDrafts';
import PersonalDrafts from './delegate/PersonalDrafts';

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
const Delegate = (props) => {
    return (
        <Container fluid>
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
        </Container>
    );
}
/* eslint-enable react/prop-types */
export default Delegate;