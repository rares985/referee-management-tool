import React, { useState, useEffect } from 'react';
import { Button, FormGroup, FormControl, FormLabel, Card, Spinner } from 'react-bootstrap';
import {PersonBoundingBox} from '../components/Icons';

/* eslint-disable */
const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});


const PersonalInformationForm = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading , setIsLoading] = useState(true);

  /* Read-only, should not be modified by user */
  const [county, setCounty] = useState('');
  const [category, setCategory] = useState('');
  const [lot, setLot] = useState('');

  useEffect(() => {
    if (isLoading) {
      axios
        .get('/api/personalInfo', {
          params: {
            username: props.authenticatedUser,
          }
        })
        .then(
          (response) => {
            if (response.status === 200) {
              setIsLoading(false);
              setAddress(response.data.Adresa);
              setCategory(response.data.Categorie);
              setEmail(response.data.Email);
              setCounty(response.data.Judet);
              setLot(response.data.Lot);
              setLastName(response.data.Nume);
              setFirstName(response.data.Prenume);
              setMobilePhone(response.data.Telefon);
              console.log(response.data);
            }
          },
          (error) => {
            console.error(error);
          }
        );
    }
  });

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
      { isLoading && <Spinner animation="border" />}
      { !isLoading && 
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
              <FormGroup controlId="category">
                <FormLabel>Categorie</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  defaultValue={category}
                  readOnly />
              </FormGroup>
              <FormGroup controlId="lot">
                <FormLabel>Lot</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  defaultValue={lot}
                  readOnly />
              </FormGroup>
              <FormGroup controlId="county">
                <FormLabel>Judet</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  defaultValue={county}
                  readOnly />
              </FormGroup>
              <Button block disabled={!validateForm()} type="submit">
                Actualizare
              </Button>
            </form>
          </Card>
        </div>
      }
      </div>
  );
};

/* eslint-enable */

export default PersonalInformationForm;
