import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import LoginAction from '../actions/LoginAction';

import MaskableTextField from './login/MaskableTextField';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
  },
  avatarContainer: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  avatarIcon: {
    animation: 'rotation 0.5s linear',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkAlignRight: {
    textAlign: 'right',
  },
  socialMediaRegister: {
    padding: theme.spacing(2),
  },
  socialMediaRegisterTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  socialMediaIcon: {
    textAlign: 'center',
  },

  paperNoAccount: {
    padding: theme.spacing(0),
    marginTop: theme.spacing(4),
    transform: 'scale(1)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    }),
    background: blueGrey[100],
    color: blueGrey[900],
  },
  listItemNoAccount: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
  listElementNoAccount: {
    padding: theme.spacing(2),
  },
  noAccountText: {
    display: 'flex',
    flexDirection: 'row',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    }),
  },
  root: {
    marginBottom: theme.spacing(5),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const mapStateToProps = (state) => ({
  user: state.login.user,
  error: state.login.error,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitLoginRequest: (request) => {
    dispatch(LoginAction(request));
  },
});

const Login = (props) => {
  const classes = useStyles();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { error, onSubmitLoginRequest } = props;

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmitLoginRequest({
      username,
      password,
    });
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} className={classes.paper}>
        <Box border={1} borderColor={grey[900]} className={classes.avatarContainer}>
          <Avatar className={classes.avatar}>
            <FontAwesomeIcon icon={faLock} className={classes.avatarIcon} />
          </Avatar>
        </Box>
        <Typography component="h1" variant="h4">
          <Box letterSpacing={5}>Autentificare</Box>
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
            value={username}
            error={error}
            InputProps={{}}
            helperText={error ? 'Username/parola incorecta' : ''}
            onChange={(event) => setUsername(event.target.value)}
          />
          <MaskableTextField
            variant="filled"
            margin="none"
            required
            fullWidth
            name="password"
            label="Parola"
            id="password"
            autoComplete="current-password"
            value={password}
            error={error}
            helperText={error ? 'Username/parola incorecta' : ''}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
          >
            Autentificare
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

Login.propTypes = {
  error: PropTypes.string,
  onSubmitLoginRequest: PropTypes.func.isRequired,
};

Login.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
