import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import axios from "axios";
import {
  getAll,
  // getBudgetAccomodation,
  getBudget,
  getSpent,
} from "../services/budgetService";
// import { getSpentAccomodation } from "../services/transactionService";
// import budgetCategoriesArray from "../budgetCategoriesArray";

const BudgetCategories = (props) => {
  const [tripName, setTripName] = useState("");
  const [tripNameList, setTripNameList] = useState(null);
  const [spent, setSpent] = useState(null);

  // const [budgetAccomodation, setBudgetAccomodation] = useState(null);
  // const [spentAccomodation, setSpentAccomodation] = useState(null);
  // const difference = budgetAccomodation - spentAccomodation;
  // const percentage = (spentAccomodation / budgetAccomodation) * 100;

  // attempt with map
  // const [budgetCategory, setBudgetCategory] = useState(null);
  // const [budgetAmount, setBudgetAmount] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!tripNameList) {
      getTripNameList();
      // renderBudgetCategory();
      // renderBudgetCategory(tripName, budgetCategory);
      // renderBudgetCategory(tripName, category);
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
    // console.log(res);
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
  const renderBudgetCategory = async (tripName) => {
    let res = await getBudget(tripName);
    console.log(res);
    console.log("testing");
    setData(res);
  };

  // attempt 1
  // const renderSpent = async (elements, tripName) => {
  //   let res = await getSpent(elements.budget_category, tripName);
  //   console.log(elements.budget_category);
  //   console.log(res);
  //   setSpent(res);
  //   return 1;
  // };

  // attempt 2
  const renderSpent = async (tripName) => {
    let res = await getSpent(tripName);
    console.log(res);
    setSpent(res); //this returns the transactions of a specific trip. Spent is an array of objects(transactions)
  };

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
  console.log(data);
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
              renderSpent(event.target.value); // this are transactions corresponding to one trip
              // renderBudgetAccomodation(event.target.value);
              // renderSpentAccomodation(event.target.value);
              renderBudgetCategory(event.target.value);
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
      {/* each element is an object */}

      {/* {data &&
        data[0].budgets.map((elements) => (
          // <div>
          <>
            <div>
              <h2>{elements.budget_category}</h2>
              <h1>{elements.budget_amount}</h1>
            </div>
          </>
        ))} */}
      {data && data.length > 0
        ? data[0].budgets.map((elements) => {
            // renderSpent(elements, tripName);
            let filterSpent = spent.filter((object) => {
              return object.budget_category === elements.budget_category;
            }); // filterSpent is an array of objects(transactions in the same category hopefully?)
            let spentValue = filterSpent.reduce(function (prev, cur) {
              return prev + cur.transaction_value;
            }, 0);
            console.log(elements.budget_category + filterSpent.length);
            return (
              // <div>

              <>
                <div>
                  <h2>
                    {elements.budget_category} budget for {tripName}
                  </h2>
                  <h1>budget amount:{elements.budget_amount}</h1>
                  <h2>times spent: {filterSpent.length}</h2>
                  <h3>amount spent: {spentValue}</h3>
                </div>
              </>
            );
          })
        : null}
      {spent && spent.length > 0 ? (
        <h2>Spent: </h2>
      ) : (
        <h1>Amount spent isn't working</h1>
      )}

      {props.budgetCategoriesArry.map((category) => {
        // attempt using map
        // ================================================>>>>>>>> this state is causing an
        // setBudgetCategory(category);
        // renderBudgetCategory(tripName, category);
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
