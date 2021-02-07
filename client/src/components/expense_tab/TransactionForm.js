import React, { useState } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
// import { Form, Field } from "react-final-form";
import { Grid, Button, MenuItem, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { getBudget } from "../../services/budgetService";

// Material-ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import axios from "axios";

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
  const { auth } = props;
  // NEW:
  //>>>> The balance is the sum of those values with test for now
  //
  const [description, setDescription] = useState("");
  const [transactionValue, setTransactionValue] = useState(0);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [transactionCategory, setTransactionCategory] = useState("");
  const [tripTransaction, setTripTransaction] = useState(null);
  //
  const [budgetCategoriesArray, setBudgetCategoriesArray] = useState([]);

  //>>>// this might need to change, for now depending on the trip selected (for the transaction or budgets to display) we will get its corresponded categories :
  const handleBudgetCategoriesArray = async (tripName) => {
    let res = await getBudget(tripName);
    if (res.length > 0) {
      let preArray = [];
      res[0].budgets.forEach((budget) => {
        preArray.push(budget.budget_category);
      });
      setBudgetCategoriesArray(preArray);
    } else {
      setBudgetCategoriesArray([
        "Accomodation",
        "Transport",
        "Food",
        "Entertainment",
        "Shopping",
        "Others",
      ]);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    //>>>> users can post a transaction to the accomodation sect.
    axios.post(`/api/expense`, {
      transaction_value: transactionValue,
      description: description,
      transaction_date: selectedDate, //
      budget_category: transactionCategory, //
      trip_name: tripTransaction,
      user_ref_email: auth.user.email,
    });

    //>>>> this is to clear the input fields once clicked submit. The values will still be saved in the mongo database
    setTransactionValue(0);
    setDescription("");
    // handleDateChange(new Date());
    setTransactionCategory("");
    setTripTransaction("");

    props.setHasSubmitedTransaction(true);
  }

  return (
    <div className="budgetPage-Div">
      <div
        className="transactions-form-ui-div"
        style={{
          padding: 20,
          margin: "auto",
          marginBottom: "20px",
          maxWidth: 600,
        }}
      >
        <h2 className="budgetPage-subtitle">INPUT AN EXPENSE</h2>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            style={{ padding: "10px" }}
          >
            <Grid item xs="auto" sm={4} className="my-1">
              <TextField
                id="Description"
                color="secondary"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs="auto" sm={4} className="my-1">
              <TextField
                id="TripName"
                color="secondary"
                label="Trip Name"
                select
                value={tripTransaction}
                onChange={(e) => {
                  setTripTransaction(e.target.value);
                  handleBudgetCategoriesArray(e.target.value);
                }}
                required
                style={{ width: "15ch" }}
              >
                <MenuItem key="blanc" value=""></MenuItem>
                {props.tripNameList && props.tripNameList.length > 0
                  ? props.tripNameList.map((trip) =>
                      props.renderTripNameList(trip)
                    )
                  : null}
              </TextField>
            </Grid>
            <Grid item xs="auto" sm={4} className="my-1">
              <TextField
                label="Transaction value"
                value={transactionValue}
                onChange={(event) => setTransactionValue(event.target.value)}
                name="Transaction-value-input"
                id="Transaction-value-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                required
              />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="flex-start"
            justifycontent="space-around"
            spacing={2}
            style={{ padding: "10px" }}
          >
            <Grid item xs="auto" sm={6}>
              {/* to input the date of the transaction we are using material-ui */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  label="Date of the transaction"
                  clearable
                  value={selectedDate}
                  onChange={(date) => {
                    handleDateChange(date);
                  }}
                  // minDate={new Date()}
                  format="dd/MM/yyyy"
                  style={{ width: "25ch" }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs="auto" sm={6} className="my-2">
              <TextField
                id="category-input-form"
                label="Select a category"
                value={transactionCategory}
                select
                onChange={(event) => setTransactionCategory(event.target.value)}
                style={{ width: "25ch" }}
                required
              >
                {budgetCategoriesArray &&
                  budgetCategoriesArray.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
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
            Submit Transaction
          </ColorButton>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
