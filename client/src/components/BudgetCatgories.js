import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { getAll } from "../services/budgetService";

const BudgetCategories = (props) => {
  const [tripName, setTripName] = useState("");
  const [tripNameList, setTripNameList] = useState(null);

  const renderTripNameList = (trip) => {
    return <option key={trip.trip_name}>{trip.trip_name}</option>;
  };

  useEffect(() => {
    if (!tripNameList) {
      getTripNameList();
    }
  });

  const getTripNameList = async () => {
    // from budgetService
    let res = await getAll();
    setTripNameList(res);
  };

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
      <Form>
        <Form.Group>
          <Form.Label>Select a trip</Form.Label>
          <Form.Control
            as="select"
            placeholder="e.g Transport"
            onChange={(event) => setTripName(event.target.value)}
          >
            {/* here i need to map the name of the trips inside the budget collection */}
            {tripNameList && tripNameList.length > 0 ? (
              tripNameList.map((trip) => renderTripNameList(trip))
            ) : (
              <option>No trips found</option>
            )}
            {/* {budgetCategoriesArry.map((category) => (
              <option value={category}>{category}</option>
            ))} */}
          </Form.Control>
        </Form.Group>
      </Form>

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
