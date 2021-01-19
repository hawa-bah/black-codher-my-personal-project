import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect, useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/actions/authActions";
// material-ui
import { Grid, TextField } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// Mmeterial-ui
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

const Register = (props) => {
  // redux:
  const dispatch = useDispatch();
  const errorsRedux = useSelector((state) => state.errors);
  console.log("history", props.history);

  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    passwordToConfirm: "",
    showPassword: false,
    errors: {},
  });

  useEffect(() => {
    if (errorsRedux) {
      console.log("FROM THE USE EFFECT");
      console.log("ERROR REDUX:", errorsRedux);
    }
  }, [errorsRedux]);

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
    console.log("ERRORS", signUpInfo.errors);

    const newUser = {
      name: signUpInfo.name,
      email: signUpInfo.email,
      password: signUpInfo.password,
      passwordToConfirm: signUpInfo.passwordToConfirm,
    };
    console.log("REGISTER FUNC.", newUser);

    // redux
    dispatch(registerUser(newUser, props.history));
    console.log("ERROR REDUX:", errorsRedux);
  };

  const handleSignUpInfo = (event) => {
    const { id, value } = event.target;

    setSignUpInfo({ ...signUpInfo, [id]: value });
    console.log(signUpInfo);
  };

  return (
    <div className="Register-div">
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link
              to="/"
              className="btn-flat waves-effect"
              style={{ backgroundColor: "black" }}
            >
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="register-form-div"
        style={{
          padding: 20,
          margin: "auto",
          marginBottom: "20px",
          maxWidth: 600,
        }}
      >
        <form
          noValidate
          onSubmit={(e) => {
            handleRegister(e);
            console.log("clickSubmit");
          }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            style={{ padding: "10px" }}
          >
            <Grid item xs="auto" sm={12} className="my-1">
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
            </Grid>
            <Grid item xs="auto" sm={12} className="my-1">
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
            </Grid>
            <Grid item sm={12}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
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
              <FormControl className={clsx(classes.margin, classes.textField)}>
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
          <button
            variant="contained"
            color="primary"
            className="btn  btn-large waves-effect waves-light hoverable orange accent-3 white-text"
            type="submit"
          >
            Ready to Sign Up!
          </button>
        </form>
      </div>
    </div>
  );
};
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
// getting state from Redux
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
// export default Register;
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
