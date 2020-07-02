import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import IconButton from '@material-ui/core/IconButton';


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

DismissibleHelper.propTypes = {
  text: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
}

export default DismissibleHelper;