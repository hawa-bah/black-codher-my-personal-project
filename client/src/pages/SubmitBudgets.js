import react, { useEffect, useState } from "react";
import { Grid, MenuItem, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { getAll } from "../services/budgetService";

const SubmitBudgetPage = (props) => {
  const [budget, setBudget] = useState(null);
  const [budgetAmount, setBudgetAmount] = useState(null);
  const [tripName, setTripName] = useState("");

  const [budgetArray, setBudgetArray] = useState([]);
  const [hasSubmited, setHasSubmited] = useState(false);

  const [infoCards, setInfoCards] = useState([]);

  useEffect(() => {
    getInfoCards();

    if (hasSubmited) {
      setBudgetArray([]);
      setTripName("");
      setHasSubmited(false);
    }
    if (budgetArray) {
      handleSubmitBudget();
    }
  }, [infoCards]);

  function handleSubmit(event) {
    event.preventDefault();
    handleSubmitBudget();
  }

  function handleSubmitBudget() {
    const array = [];
    const obj = {
      budget_category: budget,
      budget_amount: budgetAmount,
    };
    budgetArray.push(obj);
    setBudgetArray(budgetArray);
    console.log(budgetArray);
  }

  function handlePostInfo() {
    console.log({
      budgets: budgetArray,
      trip_name: tripName,
    });

    axios.post(`/api/budget`, {
      budgets: budgetArray,
      trip_name: tripName,
    });

    setHasSubmited(true);
  }
  const getInfoCards = async () => {
    //repeated code >>>> I am getting the documents from the budget collection whith budgetService.js
    let res = await getAll();
    setInfoCards(res); //this does not work
    console.log("infoCardssss");
    console.log(res);
    console.log(infoCards);
  };

  return (
    <div>
      <div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Grid item xs="auto">
            <TextField
              label="Trip Name:"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
          </Grid>
          <Grid item xs="auto">
            <TextField
              label="Amount"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
            />
            <TextField
              label="Category"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </Grid>
          {budgetArray.length > 0
            ? budgetArray.map((budget) => {
                return (
                  <div>
                    <p>
                      {budget.budget_category} {budget.budget_amount}
                    </p>
                  </div>
                );
              })
            : "hello"}
          <button type="submit">Set a budget</button>
        </form>
        <button onClick={() => handlePostInfo()}>Post info</button>
      </div>
      <div className="budgets-info-cards-container">
        {infoCards > 0
          ? infoCards.map((infoCard) => {
              return (
                <div>
                  <p>Trip Name: {infoCard.trip_name}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SubmitBudgetPage;
