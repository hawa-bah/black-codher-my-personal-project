import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {
  getAll,
  // getBudgetAccomodation,
  getBudget,
} from "../services/budgetService";
import { getSpentAccomodation } from "../services/transactionService";
import budgetCategoriesArray from "../budgetCategoriesArray";

const BudgetCategories = (props) => {
  const [tripName, setTripName] = useState("");
  const [tripNameList, setTripNameList] = useState(null);

  const [budgetAccomodation, setBudgetAccomodation] = useState(null);
  const [spentAccomodation, setSpentAccomodation] = useState(null);
  const difference = budgetAccomodation - spentAccomodation;
  const percentage = (spentAccomodation / budgetAccomodation) * 100;

  // attempt with map
  const [budgetCategory, setBudgetCategory] = useState(null);
  const [budgetAmount, setBudgetAmount] = useState(null);

  useEffect(() => {
    if (!tripNameList) {
      getTripNameList();
    }
    // if (tripName !== null && !budgetAccomodation && !budget) {
    //   // renderBudgetAccomodation(tripName);
    //   // renderSpentAccomodation(tripName);
    //   // renderBudgetCategory(tripName, category);
    // }
    // if (budgetAccomodation) {
    //   document.getElementsByClassName();
    // }
  });

  const getTripNameList = async () => {
    //>>>> I am getting the documents from the budget collection whith budgetService.js
    let res = await getAll();
    setTripNameList(res);
    console.log(res);
  };
  const renderTripNameList = (trip) => {
    return <option key={trip.trip_name}>{trip.trip_name}</option>;
  };

  // budget collection
  // const renderBudgetAccomodation = async (tripName) => {
  //   let res = await getBudgetAccomodation(tripName);
  //   setBudgetAccomodation(res[0].budget_amount);
  // };
  // accomodation collection
  // const renderSpentAccomodation = async (tripName) => {
  //   let res = await getSpentAccomodation(tripName);
  //   setSpentAccomodation(res[0].transaction_value);
  // };

  // attempt rendering categories info using map
  // const renderBudgetCategory = async (tripName, budgetCategory) => {
  //   // let res = await getBudget(tripName);
  //   // console.log(res);
  //   console.log(budgetCategory);
  //   // let selectedBudget = res[0].budgets.filter((object) => {
  //   //   return object.budget_category === category;
  //   // });
  //   // setBudgetAmount(selectedBudget[0].budget_amount);
  // };

  // -------------------------------------------------- this is used to submit budgets which might be deleted later
  // const [budget, setbudget] = useState(null);
  // function handleSubmit(category) {
  //   console.log("i've clicked budget" + category);

  //   axios.post(`/api/budget`, {
  //     budget_category: category,
  //     budget_amount: budget,
  //   });
  // }
  // -----------------------------------------------------------------------------------------------------------
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Select a trip</Form.Label>
          <Form.Control
            as="select"
            placeholder="e.g Transport"
            onChange={(event) => {
              setTripName(event.target.value);
              // renderBudgetAccomodation(event.target.value);
              // renderSpentAccomodation(event.target.value);
              console.log("You have selected " + event.target.value);
            }}
          >
            {/* here i am mapping the name of the trips inside the budget collection */}
            {
              tripNameList && tripNameList.length > 0
                ? tripNameList.map((trip) => renderTripNameList(trip))
                : null
              // <option>No trips found</option>
            }
          </Form.Control>
        </Form.Group>
      </Form>

      {/* <div className="Accomodation Tab" style={{ background: "yellow" }}>
        <h1>Accomodation</h1>
        <p>
          Your current budget for {tripName} is {budgetAccomodation}
        </p>
        <p>
          The amount you have spent so far is {spentAccomodation} ({percentage}
          %)
        </p>
        <p>the difference is {difference}</p>
        <p></p>
      </div> */}

      {props.budgetCategoriesArry.map((category) => {
        // attempt using map
        setBudgetCategory(category);

        // renderBudgetCategory(tripName, budgetCategory);

        return (
          <div className={category + "Tab"} style={{ background: "yellow" }}>
            <h1>{category}</h1>
            <p>
              Your current budget for {tripName} is
              {/* {budgetAmount} */}
            </p>
          </div>
        );
      })}

      {/* -----------------------------------------------------this are to submit budget, might delete late */}
      {/* {props.budgetCategoriesArry.map((category) => {
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
      })} */}
      {/* ---------------------------------------------------------------------------------------------- */}
    </div>
  );
};

export default BudgetCategories;
