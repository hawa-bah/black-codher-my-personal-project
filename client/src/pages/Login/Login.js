import React, { useEffect, useState, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect, useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/actions/authActions";

// material-ui
import { Grid, MenuItem, TextField, Button } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
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

const Login = () => {
  // redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useSelector((state) => state.history);
  const errorsRedux = useSelector((state) => state.error);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    showPassword: false,
    errors: {},
  });

  // review:Equivalent Component has recieved props
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun) {
      isFirstRun.current = false;
      return;
    }
    if (auth.isAuthenticated) {
      history.push("/dashbord");
    }
    if (errorsRedux) {
      setLoginInfo({ ...loginInfo, [errors]: errorsRedux });
    }
  });
  //
  const { errors } = loginInfo;
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

    dispatch(loginUser(userData, history));
  };

  const handleloginInfo = (event) => {
    const { id, value } = event.target;

    setLoginInfo({ ...loginInfo, [id]: value });
    console.log(loginInfo);
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
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
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
          onSubmit={(event) => {
            handleLogin(event);
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
                id="email"
                color="secondary"
                label="Email"
                value={loginInfo.email}
                type="email"
                onChange={handleloginInfo}
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound,
                })}
                required
              />
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </Grid>
            <Grid item sm={12}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={loginInfo.showPassword ? "text" : "password"}
                  value={loginInfo.password}
                  onChange={handleloginInfo}
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
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
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </FormControl>
            </Grid>
          </Grid>
          <button
            variant="contained"
            color="primary"
            type="submit"
            className="btn  btn-large waves-effect waves-light hoverable orange accent-3 white-text"
          >
            Login to your account
          </button>
        </form>
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

// export default Login;
