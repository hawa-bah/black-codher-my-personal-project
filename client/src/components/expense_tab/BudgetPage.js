import DateFnsUtils from "@date-io/date-fns";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
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
  // const [balance, setBalance] = useState(null);
  //
  const [selectedDate, handleDateChange] = useState(new Date());
  const [transactionCategory, setTransactionCategory] = useState("");
  const [tripTransaction, setTripTransaction] = useState(null);

  useEffect(() => {
    // if (!balance) {
    //   renderBalance();
    // }
  });

  // const renderBalance = async () => {
  //   let res = await getBalance();
  //   setBalance(res[0].transaction_value);
  // };

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

    //>>>> atempt to update the inputed transaction in the front end
    // const res = axios.get(`/api/expense`);
    // props.setTransactions(res);
  }

  return (
    <div className="budgetPage-Div">
      <div className="budget categories card">
        <BudgetCategories
          budgetCategoriesArry={budgetCategoriesArry}
          hasSubmitedTransaction={hasSubmitedTransaction}
          setHasSubmitedTransaction={setHasSubmitedTransaction}
        />

        {/* maybe use props so that i can reuse commponents in name of the category */}
        {/* <h3>Accomodation:</h3> */}
        {/*  Amount spent in {test description} the router needs to be changed!  */}
        {/* <h2>Amount spent: {balance}</h2>
        {console.log(balance)} */}
      </div>
      <div
        className="new-form-ui"
        style={{ padding: 16, margin: "auto", maxWidth: 600 }}
      >
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
        <h2>Submit a transaction</h2>
        <Form
          onSubmit={(event) => {
            handleSubmit(event);
            // renderBalance();
            console.log(selectedDate);
          }}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="descipr"
                placeholder="input value"
                value={props.description}
                onChange={(e) => props.setDesc(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="trip_name">
              <Form.Label>trip name</Form.Label>
              <Form.Control
                type="trip_name"
                placeholder="input value"
                value={tripTransaction}
                onChange={(e) => setTripTransaction(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="Expense">
              <Form.Label>Enter a transaction</Form.Label>
              <Form.Control
                type="expense"
                placeholder="e.g. 80.00"
                value={props.transaction}
                onChange={(e) => props.setTransactions(e.target.value)}
              />
              <Form.Text className="text-muted">
                Enter negative numbers if it is an expense.
              </Form.Text>
            </Form.Group>
          </Form.Row>

          {/* to input the date of the transaction we are using material-ui */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              clearable
              value={selectedDate}
              placeholder="10/10/2018"
              onChange={(date) => handleDateChange(date)}
              // minDate={new Date()}
              format="MM/dd/yyyy"
            />
          </MuiPickersUtilsProvider>
          <Form.Group>
            <Form.Label>
              Select a category to classify the transaction{" "}
            </Form.Label>
            <Form.Control
              as="select"
              placeholder="e.g Transport"
              onChange={(event) => setTransactionCategory(event.target.value)}
            >
              {budgetCategoriesArry.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Transaction
          </Button>
        </Form>
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
