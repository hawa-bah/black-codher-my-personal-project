import react, { useEffect, useState } from "react";
import { Grid, MenuItem, TextField, Button } from "@material-ui/core";
import axios from "axios";

const SubmitBudgetPage = (props) => {
  const [budget, setBudget] = useState(null);
  const [budgetAmount, setBudgetAmount] = useState(null);
  const [tripName, setTripName] = useState("");

  const [budgetArray, setBudgetArray] = useState([]);
  const [hasSubmited, setHasSubmited] = useState(false);

  useEffect(() => {
    console.log(budgetArray);
    if (hasSubmited) {
      setBudgetArray([]);
      setTripName("");
      setHasSubmited(false);
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    const obj = {
      budget_category: budget,
      budget_amount: budgetAmount,
    };
    budgetArray.push(obj);
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

  //   function handleSubmit(category) {
  //     console.log("i've clicked budget" + category);
  //     budgetArray.push(obj);
  //     console.log(budgetArray);
  //     axios.post(`/api/budget`, {
  //       budgets: [
  //         {
  //           budget_category: budget,
  //           budget_amount: budgetAmount,
  //         },
  //       ],
  //       trip_name: tripName,
  //     });
  //   }

  //   const obj = {};
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
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => handlePostInfo()}>Post info</button>
        {/* <form onSubmit={() => handleSubmit(obj)}>
          {props.budgetCategoriesArray.map((category) => {
            const obj = {
              budget_category: budget,
              budget_amount: budgetAmount,
            };

            return (
              <div className={"card" + category}>
                <h2>{category}</h2>

                <Grid item xs="auto">
                  <TextField
                    label="Budget"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                  />
                  <TextField
                    label="Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </Grid>
              </div>
            );
          })}
          <button type="submit">Submit</button>
        </form> */}
      </div>
    </div>
  );
};

export default SubmitBudgetPage;
