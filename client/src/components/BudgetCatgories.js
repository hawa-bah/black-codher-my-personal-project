import React, { useState, useEffect } from "react";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import ProgressBar from "react-bootstrap/ProgressBar";
import { getBudget, getSpent } from "../services/budgetService";
import { getBalance } from "../services/transactionService";

const BudgetCategories = (props) => {
  const { auth } = props;

  const [tripName, setTripName] = useState(""); // tripName is used to select the trip at the top of the page
  const [spent, setSpent] = useState([]); //transactions of a specific trip. Spent is an array of objects(transactions)
  const [totalBudget, setTotalBudget] = useState(0); // total budget for a specific trip
  const [totalSpent, setTotalSpent] = useState(0); // total budget for a specific trip
  const [data, setData] = useState([]); //document from the budget collection from a specific Trip and user

  useEffect(() => {
    // >>> the color gets updated in the first time the page is loaded
    if (data.length !== 0 && spent.length !== 0 && tripName !== "Hidde") {
      changeColorBudget(data);
    }

    if (props.hasSubmitedTransaction) {
      if (tripName !== "") {
        renderSpent(tripName);
        // renderBalanceTotal(tripName);

        // >>> the color gets updated when a transaction has been submited and SPENT has been set and rendered
        if (data.length !== 0 && spent) {
          renderBudgetCategory(tripName);
          changeColorBudget(data);
        }
      }
      props.setHasSubmitedTransaction(false);
    }
  }, [props.hasSubmitedTransaction, data, tripName]);

  const changeColorBudget = (data) => {
    data[0].budgets.forEach((elements) => {
      const categoryDiv = document.getElementById(
        "category-card-div" + "" + elements.budget_category
      );

      let filterSpent = spent.filter((object) => {
        return object.budget_category === elements.budget_category;
      }); // filterSpent is an array of objects(transactions in the same category )
      let spentValue = filterSpent.reduce(function (prev, cur) {
        return prev + cur.transaction_value;
      }, 0);
      if (Math.round((spentValue / elements.budget_amount) * 100) > 75) {
        categoryDiv.style.cssText = "background-color: red; color: white";
      } else if (Math.round((spentValue / elements.budget_amount) * 100) > 60) {
        categoryDiv.style.cssText = "background-color: orange; color: black";
      } else {
        categoryDiv.style.cssText = "background-color: white; color: black";
      }
    });
  };

  const renderBudgetCategory = async (tripName) => {
    let res = await getBudget(tripName, auth.user.email);
    setData(res);
  };
  const renderSpent = async (tripName) => {
    let res = await getSpent(tripName, auth.user.email);
    setSpent(res); //this returns the transactions of a specific trip.
    // Spent is an array of objects(transactions)
  };
  const renderBalanceTotal = async (tripName) => {
    let res = await getBalance(tripName, auth.user.email);
    console.log(res);
    if (res.budgetedTotal[0]) {
      setTotalBudget(res.budgetedTotal[0].budgets);
    }
    if (res.spentTotal[0]) {
      setTotalSpent(res.spentTotal[0].transaction_value);
    }
  };

  return (
    <div className="budgetCategories-div" style={{ padding: "20px" }}>
      <h2 className="budgetPage-subtitle">VIEW YOUR BUDGETS</h2>

      <form>
        <Grid container>
          <Grid itemxs="auto">
            <TextField
              id="category-form-tripName"
              label="Choose the name of the Trip:"
              select
              onChange={(event) => {
                setTripName(event.target.value);
                renderSpent(event.target.value);
                renderBudgetCategory(event.target.value);
                renderBalanceTotal(event.target.value);
              }}
              style={{ width: "250px" }}
              required
            >
              <MenuItem key="hidde">Hidde</MenuItem>
              {props.tripNameList && props.tripNameList.length > 0
                ? props.tripNameList.map((trip) =>
                    props.renderTripNameList(trip)
                  )
                : null}
            </TextField>
          </Grid>
        </Grid>
      </form>

      {spent && spent.length > 0 && tripName !== "" ? (
        <div className="total-summary-div">
          <h1>{tripName} </h1>
          <div className="total-summary">
            <p>Total budgeted:</p> <p className="numb">{totalBudget}</p>
            <p>Total spent: </p>
            <p className="numb">
              ({Math.round((totalSpent / totalBudget) * 100)}%){totalSpent}
            </p>
          </div>
          <div className="bottom-grid total-summary">
            <p>Amount left:</p>
            <p className="numb">{totalBudget - totalSpent}</p>
          </div>
        </div>
      ) : null}

      <div className="category-card-container">
        {data && data.length && spent.length > 0
          ? data[0].budgets.map((elements, index) => {
              let filterSpent = spent.filter((object) => {
                return object.budget_category === elements.budget_category;
              }); //>>>> filterSpent is an array of objects(transactions in the same category hopefully?)
              let spentValue = filterSpent.reduce(function (prev, cur) {
                return prev + cur.transaction_value;
              }, 0);

              return (
                <>
                  <div
                    className={"category-card-div"}
                    key={index}
                    id={"category-card-div" + "" + elements.budget_category}
                    value={
                      Math.round((spentValue / elements.budget_amount) * 100) >
                      50
                    }
                  >
                    <h2 className={"category-card-title"}>
                      {elements.budget_category} budget for {tripName}
                    </h2>
                    <p>Budget amount: {elements.budget_amount}</p>
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
    </div>
  );
};

export default BudgetCategories;
