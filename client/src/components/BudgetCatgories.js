import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import ProgressBar from "react-bootstrap/ProgressBar";
import { getAll, getBudget, getSpent } from "../services/budgetService";

const BudgetCategories = (props) => {
  const [tripName, setTripName] = useState(""); // tripName is used to select the trip at thhe top of the page
  const [tripNameList, setTripNameList] = useState(null); //documents from the budget collection
  const [spent, setSpent] = useState(null);

  const [data, setData] = useState([]); //document from the budget collection from a specific Trip

  useEffect(() => {
    if (!tripNameList) {
      getTripNameList();
    }

    if (data.length !== 0) {
      changeColorBudget(data);
    } else {
      console.log("not working");
    }

    if (props.hasSubmitedTransaction) {
      renderSpent(tripName);
      console.log("heeeey has submited");
      props.setHasSubmitedTransaction(false);
    }
  }, [props.hasSubmitedTransaction, data]);

  // >>> TO SOLVE: function works but doesn't get updated at the right time
  const changeColorBudget = (data) => {
    data[0].budgets.map((elements) => {
      const categoryDiv = document.getElementById(
        "category-card-div" + "" + elements.budget_category
      );

      // repeated code
      let filterSpent = spent.filter((object) => {
        return object.budget_category === elements.budget_category;
      }); // filterSpent is an array of objects(transactions in the same category hopefully?)
      let spentValue = filterSpent.reduce(function (prev, cur) {
        return prev + cur.transaction_value;
      }, 0);
      if (Math.round((spentValue / elements.budget_amount) * 100) > 50) {
        categoryDiv.style.cssText = "background-color: red; color: white";
      } else {
        categoryDiv.style.cssText = "background-color: white; color: black";
      }
      console.log(categoryDiv);
    });
  };

  const getTripNameList = async () => {
    //>>>> I am getting the documents from the budget collection whith budgetService.js
    let res = await getAll();
    setTripNameList(res);
    // console.log(res);
  };
  const renderTripNameList = (trip) => {
    return (
      <MenuItem key={trip.trip_name} value={trip.trip_name}>
        {trip.trip_name}
      </MenuItem>
    );
  };

  //  rendering categories info
  const renderBudgetCategory = async (tripName) => {
    let res = await getBudget(tripName);
    console.log(res);
    console.log("testing");
    setData(res);
  };

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
    <div className="budgetCategories-div" style={{ padding: "20px" }}>
      <h2 className="budgetPage-subtitle">VIEW YOUR BUDGETS</h2>

      <form>
        {/* <Form.Label>Choose the name of the Trip:</Form.Label> */}
        <Grid container>
          <Grid itemxs="auto">
            <TextField
              id="category-form-tripName"
              label="Choose the name of the Trip:"
              select
              onChange={(event) => {
                setTripName(event.target.value);
                renderSpent(event.target.value); // this are transactions corresponding to one trip
                renderBudgetCategory(event.target.value);
                console.log("You have selected " + event.target.value);
              }}
              style={{ width: "250px" }}
              required
            >
              <MenuItem key="hidde">Hidde</MenuItem>
              {/* here i am mapping the name of the trips inside the budget collection */}
              {tripNameList && tripNameList.length > 0
                ? tripNameList.map((trip) => renderTripNameList(trip))
                : null}
            </TextField>
          </Grid>
        </Grid>
      </form>

      {
        spent && spent.length > 0 ? <h1>BUDGET CATEGORIES </h1> : null
        // <h1>select a Trip</h1>
      }
      <div className="category-card-container">
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
                <>
                  <div
                    className={"category-card-div"}
                    id={"category-card-div" + "" + elements.budget_category}
                    value={
                      Math.round((spentValue / elements.budget_amount) * 100) >
                      50
                    }
                  >
                    <h2 className={"category-card-title"}>
                      {elements.budget_category} budget for {tripName}
                    </h2>
                    <p>Budget amount:{elements.budget_amount}</p>
                    <p>Number of transactions: {filterSpent.length}</p>
                    <p>
                      Amount spent: {spentValue} (
                      {Math.round((spentValue / elements.budget_amount) * 100)}
                      %)
                    </p>
                    <ProgressBar
                      now={Math.round(
                        (spentValue / elements.budget_amount) * 100
                      )}
                      color="black"
                      label={
                        Math.round(
                          (spentValue / elements.budget_amount) * 100
                        ) + "%"
                      }
                    />
                    <p>Amount left: {elements.budget_amount - spentValue}</p>
                  </div>
                </>
              );
            })
          : null}
      </div>

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
