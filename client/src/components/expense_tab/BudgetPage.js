import DateFnsUtils from "@date-io/date-fns";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import TransactionsList from "../transaction_list/TransactionsList";
import { getBalance } from "../../services/transactionService";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import budgetCategoriesArry from "../../budgetCategoriesArray";
import BudgetCategories from "../BudgetCatgories";
import "./BudgetPage.css";
import "../../App.css";

const BudgetPage = (props) => {
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
      transaction_date: selectedDate,
      budget_category: transactionCategory,
      trip_name: tripTransaction,
    });
    //>>>> this is to clear the input fields once clicked submit. The values will still be saved in the mongo database
    props.setDesc("");
    props.setTransactions(0);

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
      <div className="SubmitTransaction Form div">
        <Form
          onSubmit={(event) => {
            handleSubmit(event);
            // renderBalance();
            console.log(selectedDate);
          }}
        >
          <Form.Group controlId="description">
            <Form.Label>descip</Form.Label>
            <Form.Control
              type="descipr"
              placeholder="input value"
              value={props.description}
              onChange={(e) => props.setDesc(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="trip_name">
            <Form.Label>trip name</Form.Label>
            <Form.Control
              type="trip_name"
              placeholder="input value"
              value={tripTransaction}
              onChange={(e) => setTripTransaction(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="Expense">
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
