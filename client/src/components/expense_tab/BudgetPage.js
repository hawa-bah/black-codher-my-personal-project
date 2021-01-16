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
import { getBudget } from "../../services/budgetService";

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
  // NEW:
  const [budgetCategoriesArray, setBudgetCategoriesArray] = useState([]);

  // NEW:
  const handleBudgetCategoriesArray = async (tripName) => {
    let res = await getBudget(tripName);
    if (res.length > 0) {
      let preArray = [];
      res[0].budgets.map((budget) => {
        preArray.push(budget.budget_category);
      });
      setBudgetCategoriesArray(preArray);
      console.log(budgetCategoriesArray);
    } else {
      setBudgetCategoriesArray([
        "Accomodation",
        "Transport",
        "Food",
        "Entretainment",
        "Shopping",
        "Others",
      ]);
    }
  };

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
    // handleDateChange(new Date());
    setTransactionCategory("");
    setTripTransaction("");

    setHasSubmitedTransaction(true);
  }

  return (
    <div className="budgetPage-Div">
      <h1>Budget Planner</h1>
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
            console.log("clickSubmit");
            // renderBalance();
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
                onChange={(e) => {
                  setTripTransaction(e.target.value);
                  handleBudgetCategoriesArray(e.target.value);
                }}
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
            style={{ padding: "10px" }}
          >
            <Grid item xs="auto" sm={6}>
              {/* to input the date of the transaction we are using material-ui */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  label="Date of the transaction"
                  clearable
                  value={selectedDate}
                  onChange={(date) => handleDateChange(date)}
                  // minDate={new Date()}
                  format="MM/dd/yyyy"
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

      <div className="budget categories card">
        <BudgetCategories
          budgetCategoriesArry={budgetCategoriesArry}
          hasSubmitedTransaction={hasSubmitedTransaction}
          setHasSubmitedTransaction={setHasSubmitedTransaction}
        />
      </div>

      <div
        className="Transactions-div"
        style={{ padding: "20px", marginTop: "10px" }}
      >
        <h2 className="budgetPage-subtitle">TRANSACTIONS LIST</h2>
        <div className="button transaction">
          <Button onClick={() => setViewTransactions(!viewTransactions)}>
            <p>{viewTransactions ? "Click to Hide" : "Click to view"}</p>
          </Button>
        </div>
        <div className="transaction List">
          {viewTransactions ? (
            <div>
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
