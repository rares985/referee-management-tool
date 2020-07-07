import React from 'react';
import ProposedDrafts from './proposed/ProposedDrafts';
import RejectedDrafts from './proposed/RejectedDrafts';

const Proposed = (props) => {
  return (
    <>
      <ProposedDrafts />
      <RejectedDrafts />
    </>
  );
};

export default Proposed;
