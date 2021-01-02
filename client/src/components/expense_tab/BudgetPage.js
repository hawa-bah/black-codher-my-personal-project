import DateFnsUtils from "@date-io/date-fns";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import TransactionsList from "../transaction_list/TransactionsList";
import TransactionForm from "../expense_tab/TransactionForm";
import { getBalance } from "../../services/transactionService";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import NumberFormat from "react-number-format";
// import { Form, Field } from "react-final-form";

import { Grid, MenuItem, TextField, Button } from "@material-ui/core";
// Material-ui
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import budgetCategoriesArry from "../../budgetCategoriesArray";
import BudgetCategories from "../BudgetCatgories";
import "./BudgetPage.css";
import "../../App.css";

// >> for the transaction form, numeric input
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

const BudgetPage = (props) => {
  const classes = useStyles();
  // >>>> I'm passing transactions state (the value of a transaction) as a props
  // const [budget, setbudget] = useState(0);
  // const [transaction, setTransactions] = useState(0);
  const [viewTransactions, setViewTransactions] = useState(false);
  //>>>> The balance is the sum of those values with test for now
  const [hasSubmitedTransaction, setHasSubmitedTransaction] = useState(false);
  //
  const [selectedDate, handleDateChange] = useState(new Date());
  const [transactionCategory, setTransactionCategory] = useState("");
  const [tripTransaction, setTripTransaction] = useState(null);

  useEffect(() => {
    // if (!balance) {
    //   renderBalance();
    // }
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(props.budget, props.transaction);

    //>>>> users can post a transaction to the accomodation sect.
    axios.post(`/api/expense`, {
      transaction_value: props.transaction,
      description: props.description,
      transaction_date: selectedDate, //
      budget_category: transactionCategory, //
      trip_name: tripTransaction,
    });

    //>>>> this is to clear the input fields once clicked submit. The values will still be saved in the mongo database
    props.setTransactions(0);
    props.setDesc("");
    handleDateChange(new Date());
    setTransactionCategory("");
    setTripTransaction("");

    setHasSubmitedTransaction(true);
  }

  return (
    <div className="budgetPage-Div">
      <div className="budget categories card">
        <BudgetCategories
          budgetCategoriesArry={budgetCategoriesArry}
          hasSubmitedTransaction={hasSubmitedTransaction}
          setHasSubmitedTransaction={setHasSubmitedTransaction}
        />
      </div>
      <div
        className="transactions-form-ui-div"
        style={{ padding: 20, margin: "auto", maxWidth: 600 }}
      >
        <h2>Submit a transaction</h2>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
            console.log("clickSubmit");
            // renderBalance();
          }}
        >
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs="auto" sm={4} className="my-1">
              <TextField
                id="Description"
                color="secondary"
                label="Description"
                value={props.description}
                onChange={(e) => props.setDesc(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs="auto" sm={4} className="my-1">
              <TextField
                id="TripName"
                color="secondary"
                label="Trip Name"
                value={tripTransaction}
                onChange={(e) => setTripTransaction(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs="auto" sm={4} className="my-1">
              <TextField
                label="Transaction value"
                value={props.transaction}
                onChange={(event) => props.setTransactions(event.target.value)}
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
            justifyContent="space-around"
            spacing={2}
          >
            <Grid item xs="auto" sm={6} className="my-2">
              {/* to input the date of the transaction we are using material-ui */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  label="Date of the transaction"
                  clearable
                  value={selectedDate}
                  placeholder="10/10/2018"
                  onChange={(date) => handleDateChange(date)}
                  // minDate={new Date()}
                  format="MM/dd/yyyy"
                  required
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
                {budgetCategoriesArry.map((category) => (
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
            styles={{ padding: "16px" }}
          >
            Submit Form
          </ColorButton>
        </form>
      </div>
      <div className="SubmitTransaction-Form-div">
        {/* <TransactionForm
          handleSubmit={handleSubmit}
          description={props.description}
          setDesc={props.setDesc}
          tripTransaction={tripTransaction}
          setTripTransaction={setTripTransaction}
          transactionCategory={transactionCategory}
          setTransactionCategory={setTransactionCategory}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          //
          hasSubmitedTransaction={hasSubmitedTransaction}
          setHasSubmitedTransaction={setHasSubmitedTransaction}
        ></TransactionForm> */}
      </div>

      <div className="Transactions div">
        <div className="button transaction">
          <Button onClick={() => setViewTransactions(!viewTransactions)}>
            <p>
              {viewTransactions ? "Hide transactions" : "View Transactions"}
            </p>
          </Button>
        </div>
        <div className="transaction List">
          {viewTransactions ? (
            <div>
              <h2>Transaction list component</h2>
              <TransactionsList
                viewTransactions={viewTransactions}
                setViewTransactions={setViewTransactions}
                hasSubmitedTransaction={hasSubmitedTransaction}
                setHasSubmitedTransaction={setHasSubmitedTransaction}

                // renderBalance={renderBalance}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
