import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// PAGES
import BudgetPage from "./components/expense_tab/BudgetPage";
import SubmitBudgetPage from "./pages/SubmitBudgets";
import budgetCategoriesArry from "./budgetCategoriesArray";
// SERVICES
import { getAll, deleteOne } from "./services/userService";

function App() {
  const [budget, setbudget] = useState(0);

  //>>>> this will be used for inputing the expenses/transactions and viewing the transactions:
  const [transaction, setTransactions] = useState(0);
  const [description, setDesc] = useState("");

  const [users, setusers] = useState(null);

  useEffect(() => {
    if (!users) {
      getusers();
    }
  });

  const getusers = async () => {
    let res = await getAll();
    setusers(res);
  };

  const deleteuser = async (user) => {
    let res = await deleteOne(user);
    setusers(res);
  };

  const renderUser = (user) => {
    return (
      <li key={user._id}>
        <button
          onClick={() => {
            deleteuser(user);
          }}
        >
          Delete
        </button>
        <h3>
          {`${user.first_name} 
          ${user.last_name}`}
        </h3>
        <p>{user.location}</p>
      </li>
    );
  };

  return (
    <div>
      <Router>
        <Route
          exact
          path="/expenseTracker"
          render={() => (
            <React.Fragment>
              <BudgetPage
                budget={budget}
                setbudget={setbudget}
                //
                transaction={transaction}
                setTransactions={setTransactions}
                description={description}
                setDesc={setDesc}
              />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/budgetInfo"
          render={() => (
            <React.Fragment>
              <SubmitBudgetPage budgetCategoriesArray={budgetCategoriesArry} />
            </React.Fragment>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
