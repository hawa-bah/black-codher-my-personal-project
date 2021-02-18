import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect, useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/actions/authActions";
// material-ui
import { Button, Grid, TextField } from "@material-ui/core";
import clsx from "clsx";
import useStyles from "./styles-ui";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Register = (props) => {
  // redux:
  const dispatch = useDispatch();
  const errorsRedux = useSelector((state) => state.errors);

  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    passwordToConfirm: "",
    showPassword: false,
    errors: {},
  });

  // material-ui
  const classes = useStyles();

  const handleClickShowPassword = () => {
    setSignUpInfo({ ...signUpInfo, showPassword: !signUpInfo.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      name: signUpInfo.name,
      email: signUpInfo.email,
      password: signUpInfo.password,
      passwordToConfirm: signUpInfo.passwordToConfirm,
    };

    dispatch(registerUser(newUser, props.history));
  };

  const handleSignUpInfo = (event) => {
    const { id, value } = event.target;

    setSignUpInfo({ ...signUpInfo, [id]: value });
  };

  return (
    <div className="Register-div">
      <div>
        <div styles={{ width: "300px" }}>
          <div className={classes.row}>
            <div className="col s8 ">
              <Link to="/" className="auth-link">
                <i className="material-icons left">keyboard_backspace</i> Back
              </Link>
              <div className="col s9">
                <h4>
                  <b>Register</b> below
                </h4>
                <p className="white-text text-darken-1">
                  Already have an account?{" "}
                  <Link className="auth-link" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.form}>
          <form
            noValidate
            onSubmit={(e) => {
              handleRegister(e);
            }}
            className={classes.root}
          >
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs="auto" sm={12} className="my-1">
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <TextField
                    id="name"
                    color="secondary"
                    label="Name"
                    value={signUpInfo.name}
                    error={errorsRedux.name && errorsRedux.name}
                    onChange={handleSignUpInfo}
                    className={classnames("", {
                      invalid: errorsRedux.name,
                    })}
                  />
                  <span className="red-text">
                    {errorsRedux.name && errorsRedux.name}
                  </span>
                </FormControl>
              </Grid>
              <Grid item xs="auto" sm={12} className="my-1">
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <TextField
                    id="email"
                    color="secondary"
                    label="Email"
                    value={signUpInfo.email}
                    error={errorsRedux.email}
                    onChange={handleSignUpInfo}
                    className={classnames("", {
                      invalid: errorsRedux.email || errorsRedux.emailnotfound,
                    })}
                  />
                  <span className="red-text">
                    {errorsRedux.email}
                    {errorsRedux.emailnotfound}
                  </span>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type={signUpInfo.showPassword ? "text" : "password"}
                    value={signUpInfo.password}
                    error={errorsRedux.password}
                    onChange={handleSignUpInfo}
                    className={classnames("", {
                      invalid:
                        errorsRedux.password || errorsRedux.passwordincorrect,
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {signUpInfo.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <span className="red-text">
                    {errorsRedux.password}
                    {errorsRedux.passwordincorrect}
                  </span>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="password">Confirm Password</InputLabel>
                  <Input
                    id="passwordToConfirm"
                    type={signUpInfo.showPassword ? "text" : "password"}
                    value={signUpInfo.passwordToConfirm}
                    error={errorsRedux.passwordToConfim}
                    onChange={handleSignUpInfo}
                    className={classnames("", {
                      invalid: errorsRedux.passwordToConfim,
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {signUpInfo.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <span className="red-text">
                    {errorsRedux.passwordToConfirm}
                  </span>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              type="submit"
            >
              Ready to Sign Up!
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
