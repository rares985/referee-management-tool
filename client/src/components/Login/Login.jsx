import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "ramda";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import SHA3 from "sha3";
import MaskableTextField from "./MaskableTextField/MaskableTextField";
import { LoginUser } from "../../actions/index";

const styles = (theme) => {
  return {
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
        theme.spacing.unit * 3
      }px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  };
};

const mapStateToProps = (state) => ({
  logged_in: state.loginPage.logged_in,
  loading: state.loginPage.loading,
  error: state.loginPage.error,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (request) => {
    dispatch(LoginUser(request));
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const sha3 = new SHA3(256);
    const { email, password } = this.state;
    const { onSubmit } = this.props;

    const request = {
      email,
      password: sha3.update(password).digest("hex"),
    };

    onSubmit(request);
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  /* TODO: Access levels:
    0 - root (cel care aproba)
    1 - proposer (cel care face proposals)
    2 - arbitru (cel care are cont si sa isi vada profilul)
    3 - public
  */

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logare
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                onChange={this.handleChange}
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <MaskableTextField
                id="password"
                label="Password*"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {/* TODO: Inspect how to use rememberMe checkbox... */}
              Logare
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}
/* eslint-disable react/forbid-prop-types */
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Login);
