import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect, useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/actions/authActions";

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

const Login = (props) => {
  // redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const errorsRedux = useSelector((state) => state.errors);
  console.log(props.history);
  console.log(errorsRedux);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    showPassword: false,
    errors: {}, // thisobject can be deleted
  });

  useEffect(() => {
    console.log("use effect");
    console.log(auth.isAuthenticated);

    if (auth.isAuthenticated) {
      console.log("using push");
      props.history.push("/budgetInfo");
    }
    if (errorsRedux) {
      console.log(errorsRedux);
    }
  }, [auth, errorsRedux]);
  //

  // material-ui
  const classes = useStyles();

  const handleClickShowPassword = () => {
    setLoginInfo({ ...loginInfo, showPassword: !loginInfo.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginInfo);
    const userData = {
      email: loginInfo.email,
      password: loginInfo.password,
    };

    dispatch(loginUser(userData));
    console.log("AUTH", auth);
  };

  const handleloginInfo = (event) => {
    const { id, value } = event.target;
    setLoginInfo({ ...loginInfo, [id]: value });
    console.log(loginInfo);
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
                  <b>Login</b> below
                </h4>
                <p className="white-text text-darken-1">
                  Don't have an account?{" "}
                  <Link to="/register" className="auth-link">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.form}>
          <form
            noValidate
            onSubmit={(event) => {
              handleLogin(event);
              console.log("clickSubmit");
            }}
            className={classes.root}
          >
            <Grid
              container
              alignItems="flex-start"
              spacing={2}
              style={{ padding: "10px" }}
            >
              <Grid item xs="auto" sm={12} className="my-1">
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <TextField
                    id="email"
                    color="secondary"
                    label="Email"
                    value={loginInfo.email}
                    error={errorsRedux.email}
                    onChange={handleloginInfo}
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
              <Grid item xs="auto" sm={7} className="my-1">
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type={loginInfo.showPassword ? "text" : "password"}
                    value={loginInfo.password}
                    onChange={handleloginInfo}
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
                          {loginInfo.showPassword ? (
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
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Login to your account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
