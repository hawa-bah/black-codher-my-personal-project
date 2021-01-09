import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// Material-ui
import Button from "@material-ui/core/Button";
import NumberFormat from "react-number-format";

import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import { Grid, FormControlLabel, TextField } from "@material-ui/core";

import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormatHelperText from "@material-ui/core/FormHelperText";
import Axios from "axios";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="£"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const SubmitInfoForm = (props) => {
  //   const [hasSubmitedInfo, setHasSubmitedInfo] = useState(false);
  const [tripNameSubmit, setTripNamesSubmit] = useState("");
  const [accomodationAmount, setAccomodationAmount] = useState(null);
  const [transportAmount, setTransportAmount] = useState(null);
  const [entertainmentAmount, setEntertainmentAmount] = useState(null);
  const [shoppingAmount, setShoppingAmount] = useState(null);
  const [foodAmount, setFoodAmount] = useState(null);
  const [othersAmount, setOthersAmount] = useState(null);

  useEffect(() => {});

  const handleSubmitInfo = (e) => {
    props.setHasSubmitedInfo(!props.hasSubmitedInfo);
    e.preventDefault();
    axios.post(`/api/submit/info/card`, {
      trip_name: tripNameSubmit,
      budgets: [
        { budget_category: "Transport", budget_amount: transportAmount },
        { budget_category: "Accomodation", budget_amount: accomodationAmount },
        { budget_category: "Others", budget_amount: othersAmount },
        { budget_category: "Food", budget_amount: foodAmount },
        { budget_category: "Shopping", budget_amount: shoppingAmount },
        { budget_category: "Entrainment", budget_amount: entertainmentAmount },
      ],
    });
  };
  return (
    <div>
      <div className="submit-Info-Form">
        <form onSubmit={(e) => handleSubmitInfo(e)}>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={4}>
              <TextField
                id="Trip_Name"
                color="secondary"
                label="Trip Name"
                value={tripNameSubmit}
                onChange={(e) => setTripNamesSubmit(e.target.value)}
                fullWidth
                required
              />

              <TextField
                id=""
                color="secondary"
                label="Transport amount"
                value={transportAmount}
                onChange={(e) => setTransportAmount(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="Accomodation"
                color="secondary"
                label="Accomodation amount"
                value={accomodationAmount}
                onChange={(e) => setAccomodationAmount(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                fullWidth
                required
              />
              <TextField
                id="entratainment"
                color="secondary"
                label="entratainment amount"
                value={entertainmentAmount}
                onChange={(e) => setEntertainmentAmount(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                fullWidth
                required
              />
              <TextField
                id="shopping"
                color="secondary"
                label="shopping amount"
                value={shoppingAmount}
                onChange={(e) => setShoppingAmount(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                fullWidth
                required
              />
              <TextField
                id="others"
                color="secondary"
                label="others amount"
                value={foodAmount}
                onChange={(e) => setFoodAmount(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                fullWidth
                required
              />
              <TextField
                id="others"
                color="secondary"
                label="others amount"
                value={othersAmount}
                onChange={(e) => setOthersAmount(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <ColorButton type="submit">Submit new budget</ColorButton>
        </form>
      </div>
    </div>
  );
};

export default SubmitInfoForm;
