import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
// import { Form, Field } from "react-final-form";

import {
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  TextField,
  TextHelper,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import budgetCategoriesArry from "../../budgetCategoriesArray";

// Material-ui
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

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

const TransactionForm = (props) => {
  const classes = useStyles();

  return (
    <div
      className="new-form-ui"
      style={{ padding: 16, margin: "auto", maxWidth: 600 }}
    >
      <form
        onSubmit={(event) => {
          props.handleSubmit(event);
          // renderBalance();
        }}
      >
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={4}>
            <TextField
              id="Description"
              color="secondary"
              label="Description"
              value={props.description}
              onChange={(e) => props.setDesc(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="TripName"
              color="secondary"
              label="Trip Name"
              value={props.tripTransaction}
              onChange={(e) => props.setTripTransaction(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Transaction value"
              value={props.transactionCategory}
              onChange={(event) =>
                props.setTransactionCategory(event.target.value)
              }
              name="Transaction-value-input"
              id="Transaction-value-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              fullwidth
              required
            />
          </Grid>
        </Grid>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={6}>
            {/* to input the date of the transaction we are using material-ui */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Date of the transaction"
                clearable
                value={props.selectedDate}
                placeholder="10/10/2018"
                onChange={(date) => props.handleDateChange(date)}
                // minDate={new Date()}
                format="MM/dd/yyyy"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="category-input-form"
              label="Select a category"
              value={props.transactionCategory}
              select
              onChange={(event) =>
                props.setTransactionCategory(event.target.value)
              }
              style={{ width: "25ch" }}
            >
              {budgetCategoriesArry.map((category) => (
                <div>
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                </div>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <ColorButton
          variant="contained"
          color="primary"
          className={classes.margin}
          type="submit"
        >
          Submit Filters
        </ColorButton>
      </form>
    </div>
  );
};

export default TransactionForm;
