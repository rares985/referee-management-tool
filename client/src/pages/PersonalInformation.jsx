import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';

import { FormGroup } from 'react-bootstrap';
import { PersonBoundingBox } from '../components/Icons';

import { FetchPersonalInfo, UpdatePersonalInfo } from '../actions/PersonalInfoActions';
import DropDownSelector from '../components/DropdownSelector';

import categories from '../constants/categories';
import counties from '../constants/counties';
import lots from '../constants/lots';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selector: {
    marginTop: theme.spacing(3),
  },
}));

const mapStateToProps = (state) => ({
  info: state.personal.info,
  loading: state.personal.loading,
  error: state.personal.error,
});

const mapDispatchToProps = (dispatch) => ({
  doFetchPersonalInfo: (request) => {
    dispatch(FetchPersonalInfo(request));
  },
  doUpdatePersonalInfo: (request) => {
    dispatch(UpdatePersonalInfo(request));
  },
});

const PersonalInformation = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [email, setEmail] = useState('');

  /* Read-only, should not be modified by user */
  const [county, setCounty] = useState('');
  const [category, setCategory] = useState('');
  const [lot, setLot] = useState('');

  // eslint-disable-next-line no-unused-vars
  const { user, info, loading, error, allowChangeRankFields } = props;
  const { doFetchPersonalInfo, doUpdatePersonalInfo } = props;

  const classes = useStyles();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (loading) {
      doFetchPersonalInfo({
        username: user,
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
  /* eslint-enable react-hooks/exhaustive-deps */

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
    <Container maxWidth="sm">
      <CssBaseline>
        {loading && <CircularProgress />}
        {!loading && (
          <Paper elevation={4} className={classes.root}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.avatar}>
                <PersonBoundingBox />
              </div>
              <FormGroup controlId="last_name">
                <TextField
                  variant="outlined"
                  margin="normal"
                  autoFocus
                  type="text"
                  label="Nume"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="first_name">
                <TextField
                  variant="outlined"
                  margin="normal"
                  autoFocus
                  type="text"
                  label="Prenume"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="address">
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  type="text"
                  label="Adresa"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="mobile_phone">
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  type="tel"
                  label="Număr telefon mobil"
                  fullWidth
                  pattern="07[1-9][0-9][0-9]{6}"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="personal_email">
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  type="email"
                  label="Adresă e-mail"
                  value={email}
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="categories" className={classes.selector}>
                <DropDownSelector
                  label="Categorie"
                  choices={categories}
                  value={category}
                  setValue={setCategory}
                  allowChange
                />
              </FormGroup>

              <FormGroup controlId="lots" className={classes.selector}>
                <DropDownSelector
                  label="Lot"
                  choices={lots}
                  value={lot}
                  setValue={setLot}
                  allowChange
                />
              </FormGroup>

              <FormGroup controlId="counties" className={classes.selector}>
                <DropDownSelector
                  label="Județ"
                  choices={counties}
                  value={county}
                  setValue={setCounty}
                  allowChange
                />
              </FormGroup>
              <Button
                className={classes.submit}
                variant="contained"
                color="primary"
                block="true"
                disabled={!validateForm()}
                type="submit"
              >
                Actualizare
              </Button>
            </form>
          </Paper>
        )}
      </CssBaseline>
    </Container>
  );
};

PersonalInformation.propTypes = {
  user: PropTypes.string.isRequired,
  info: PropTypes.exact({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    address: PropTypes.string,
    phone_number: PropTypes.string,
    email: PropTypes.string,
    jud: PropTypes.string,
    cat: PropTypes.string,
    lot: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  doFetchPersonalInfo: PropTypes.func.isRequired,
  doUpdatePersonalInfo: PropTypes.func.isRequired,
  allowChangeRankFields: PropTypes.bool,
};

PersonalInformation.defaultProps = {
  allowChangeRankFields: false,
  error: '',
  info: {
    id: '',
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    email: '',
    jud: '',
    cat: '',
    lot: '',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
