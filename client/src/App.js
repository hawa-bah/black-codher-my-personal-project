import React, { useState, useEffect } from "react";
import BudgetPage from "./components/expense_tab/BudgetPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

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

              <div>
                <ul>
                  {users && users.length > 0 ? (
                    users.map((user) => renderUser(user))
                  ) : (
                    <p>No users found</p>
                  )}
                </ul>

                <div>
                  <button>Add</button>
                </div>
              </div>
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/"
          render={() => {
            <React.Fragment>
              <div>
                <ul>
                  {users && users.length > 0 ? (
                    users.map((user) => renderUser(user))
                  ) : (
                    <p>No users found</p>
                  )}
                </ul>

                <div>
                  <button>Add</button>
                </div>
              </div>
            </React.Fragment>;
          }}
        />
      </Router>
    </div>
  );
}

export default App;
