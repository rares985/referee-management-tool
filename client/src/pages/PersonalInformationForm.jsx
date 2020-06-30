/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Button, FormGroup, FormControl, FormLabel, Card } from 'react-bootstrap';
import { PersonBoundingBox } from '../components/Icons';

import { FetchPersonalInfo, UpdatePersonalInfo } from '../actions/PersonalInfoActions';

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
  },
  doUpdatePersonalInfo: (request) => {
    dispatch(UpdatePersonalInfo(request));
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
  const { doFetchPersonalInfo, doUpdatePersonalInfo } = props;

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (loading) {
      doFetchPersonalInfo({
        username: user
      });
    } else {
      /* Loading has finished, update local state */
      setFirstName(info.first_name);
      setLastName(info.last_name);
      setAddress(info.address);
      setMobilePhone(info.phone_number);
      setEmail(info.email);
      setCounty(info.jud);
      setCategory(info.cat);
      setLot(info.lot);
    }
  }, [loading]);

  const validateForm = () => {
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const request = {
      username: user,
      address,
      firstName,
      lastName,
      mobilePhone,
      email,
    };
    doUpdatePersonalInfo(request);
  };

  return (
    <>
      {loading && <CircularProgress />}
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
                  value={email === '' ? info.email : email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="category">
                <FormLabel>Categorie</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={category}
                  readOnly
                />
              </FormGroup>
              <FormGroup controlId="lot">
                <FormLabel>Lot</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={lot}
                  readOnly
                />
              </FormGroup>
              <FormGroup controlId="county">
                <FormLabel>Judet</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={county}
                  readOnly
                />
              </FormGroup>
              <Button block disabled={!validateForm()} type="submit">
                Actualizare
              </Button>
            </form>
          </Card>
        </div>
      }
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformationForm);

