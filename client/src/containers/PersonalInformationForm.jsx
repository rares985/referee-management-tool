import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, FormControl, FormLabel, Card } from 'react-bootstrap';

const LockIcon = () => {
  return (
    <svg
      className="bi bi-lock-fill"
      width="3em"
      height="3em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="11" height="9" x="2.5" y="7" rx="2" />
      <path fillRule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z" />
    </svg>
  );
};

const PersonBoundingBox = () => {
  return (
    <svg
      className="bi bi-person-bounding-box"
      width="5em"
      height="5em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"
      />
      <path
        fillRule="evenodd"
        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      />
    </svg>
  );
};

const PersonalInformationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [email, setEmail] = useState('');

  const validateForm = () => {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      address.length > 0 &&
      mobilePhone.length > 0 &&
      email.length > 0
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted');
  };

  return (
    <div className="page-container">
      <div className="login">
        <Card border="dark">
          <form onSubmit={handleSubmit}>
            <div className="avatar">
              <PersonBoundingBox />
            </div>
            <FormGroup controlId="last_name">
              <FormLabel>Nume</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="first_name">
              <FormLabel>Prenume</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="address">
              <FormLabel>Adresă</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="birth_date">
              <FormLabel>Data nașterii</FormLabel>
              <FormControl
                autoFocus
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="mobile_phone">
              <FormLabel>Număr telefon mobil</FormLabel>
              <FormControl
                autoFocus
                type="tel"
                pattern="07[1-9][0-9][0-9]{6}"
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="personal_email">
              <FormLabel>Adresă e-mail</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <Button block disabled={!validateForm()} type="submit">
              Actualizare
            </Button>
          </form>
        </Card>
        <p> PersonalInformationForm </p>
      </div>
    </div>
  );
};

export default PersonalInformationForm;
