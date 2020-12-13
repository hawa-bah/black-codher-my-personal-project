import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import AccomodationTransactions from "../transaction_list/accomodation_transactions";

const AccomodationTab = (props) => {
  // const [budget, setbudget] = useState(0);
  // const [transaction, setTransactions] = useState(0);
  const [viewTransactions, setViewTransactions] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(props.budget, props.transaction);
    // users can post a transaction to the accomodation
    axios.post(`/api/expense`, {
      transaction_value: props.transaction,
      description: props.description,
    });
    // this is to clear the input fields once clicked submit. The values will still be saved in the mongo database
    props.setDesc("");
    props.setTransactions(0);
  }

  return (
    <div>
      <div className="AccomodationDiv tab">
        {/* maybe use props so that i can reuse commponents in name of the category */}
        <h3>Accomodation:</h3>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Budget</Form.Label>
            <Form.Control
              type="expense"
              placeholder="input value"
              value={props.budget}
              onChange={(e) => props.setbudget(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>descip</Form.Label>
            <Form.Control
              type="descipr"
              placeholder="input value"
              value={props.description}
              onChange={(e) => props.setDesc(e.target.value)}
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
          <Button variant="primary" type="submit">
            Submit Transaction
          </Button>
        </Form>
      </div>
      <div className="Accomodation transaction List">
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
              <p>tansactionList</p>
              <AccomodationTransactions
                viewTransactions={viewTransactions}
                setViewTransactions={setViewTransactions}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AccomodationTab;
