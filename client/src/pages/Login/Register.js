import React, { useState } from "react";
import { Link } from "react-router-dom";

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

const Register = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    passwordToConfirm: "",
    showPassword: false,
  });
  const { errors } = signUpInfo; ////  WHAT IS THIS??? maybe destructuring,  oh it's the same as    const errors = this.state.errors;

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
    console.log(signUpInfo);
    const newUser = {
      name: signUpInfo.name,
      email: signUpInfo.email,
      password: signUpInfo.password,
      password2: signUpInfo.password2,
    };
  };

  const handleSignUpInfo = (event) => {
    const { id, value } = event.target;

    setSignUpInfo({ ...signUpInfo, [id]: [value] });
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
          onSubmit={(event) => {
            handleRegister(event);
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
                error={errors.name}
                onChange={handleSignUpInfo}
                required
              />
            </Grid>
            <Grid item xs="auto" sm={12} className="my-1">
              <TextField
                id="email"
                color="secondary"
                label="Email"
                value={signUpInfo.email}
                error={errors.email}
                onChange={handleSignUpInfo}
                required
              />
            </Grid>
            <Grid item sm={12}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={signUpInfo.showPassword ? "text" : "password"}
                  value={signUpInfo.password}
                  error={errors.password}
                  onChange={handleSignUpInfo}
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
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <Input
                  id="passwordToConfirm"
                  type={signUpInfo.showPassword ? "text" : "password"}
                  value={signUpInfo.passwordToConfirm}
                  error={errors.passwordToConfim}
                  onChange={handleSignUpInfo}
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

// getting state from Redux
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default Register;
// export default connect(mapStateToProps, { registerUser })(withRouter(Register));
