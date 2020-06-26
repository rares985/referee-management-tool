import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import IconButton from '@material-ui/core/IconButton';

/* eslint-disable react/prop-types */

const DismissibleHelper = (props) => {
  const [show, setShow] = useState(true);

  const { text, heading } = props;

  if (show) {
    return (
      <Alert variant="info" onClose={() => setShow(false)} dismissible>
        {heading && <Alert.Heading><WbIncandescentIcon />{heading}</Alert.Heading>}
        <p>{text}

        </p>
      </Alert>
    );
  }
  return (
    <IconButton onClick={() => setShow(true)}>
      <HelpOutlineIcon fontSize="large" />
    </IconButton>
  );
}

export default DismissibleHelper;