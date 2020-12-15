import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const BudgetCategories = (props) => {
  const [budget, setbudget] = useState(null);
  function handleSubmit(category) {
    console.log("i've clicked budget" + category);

    axios.post(`/api/budget`, {
      budget_category: category,
      budget_amount: budget,
    });
  }
  return (
    <div>
      {props.budgetCategoriesArry.map((category) => {
        return (
          <div className={"card" + category}>
            <h2>{category}</h2>
            <p>Current budget {}</p>
            <Form onSubmit={() => handleSubmit(category)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Budget</Form.Label>
                <Form.Control
                  type="expense"
                  placeholder="input value"
                  value={budget}
                  onChange={(e) => setbudget(e.target.value)}
                />
                <Button type="submit">Submit</Button>
              </Form.Group>
            </Form>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetCategories;
