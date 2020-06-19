/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Button, FormGroup, FormControl, FormLabel, Card, Spinner } from 'react-bootstrap';
import { PersonBoundingBox } from '../components/Icons';

import FetchPersonalInfo from '../actions/PersonalInfoActions';

// eslint-disable-next-line no-unused-vars
const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

const mapStateToProps = (state) => ({
  user: state.login.user,
  info: state.personal.info,
  loading: state.personal.loading,
  error: state.personal.error
});

const mapDispatchToProps = (dispatch) => ({
  doFetchPersonalInfo: (request) => {
    dispatch(FetchPersonalInfo(request));
  }
});

const PersonalInformationForm = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [email, setEmail] = useState('');

  /* Read-only, should not be modified by user */
  // eslint-disable-next-line no-unused-vars
  const [county, setCounty] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [lot, setLot] = useState('');

  // eslint-disable-next-line no-unused-vars
  const { user, info, loading, error } = props;

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const { doFetchPersonalInfo } = props;
    if (loading) {
      doFetchPersonalInfo({
        username: user
      });
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
    axios
      .post('/api/personalInfo', {
        username: user,
        address,
        firstName,
        lastName,
        mobilePhone,
        email,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            console.log(`Updated information in database for user ${user}`);
          }
        },
        (err) => {
          if (err.response) {
            if (err.response.status === 401) {
              alert("Invalid params...");
            }
          }
        }
      );
  };

  console.log(info);

  return (
    <div className="page-container">
      {loading && <Spinner animation="border" />}
      {!loading &&
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
                  value={lastName === '' ? info.last_name : lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="first_name">
                <FormLabel>Prenume</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={firstName === '' ? info.first_name : firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="address">
                <FormLabel>Adresă</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={address === '' ? info.address : address}
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
                  value={mobilePhone === '' ? info.phone_number : mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="personal_email">
                <FormLabel>Adresă e-mail</FormLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={email === '' ? info.email : email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="category">
                <FormLabel>Categorie</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  defaultValue={info.category}
                  readOnly />
              </FormGroup>
              <FormGroup controlId="lot">
                <FormLabel>Lot</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  defaultValue={info.lot}
                  readOnly />
              </FormGroup>
              <FormGroup controlId="county">
                <FormLabel>Judet</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  defaultValue={info.county}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformationForm);

