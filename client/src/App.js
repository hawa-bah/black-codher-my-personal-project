import React, { useState, useEffect } from "react";
import AccomodationTab from "./components/expense_tab/accomodation";
import FoodTab from "./components/expense_tab/Food_tab";
import { BrowserRouter as Router, Route } from "react-router-dom";

// SERVICES
import { getAll, deleteOne } from "./services/userService";

function App() {
  const [budget, setbudget] = useState(0);
  const [budgetFood, setbudgetFood] = useState(0);

  //>>>> this will be used for inputing the expenses/transactions and viewing the transactions:
  const [transaction, setTransactions] = useState(0);
  const [description, setDesc] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [date];

  //--------------- this can probably be deleted later
  // const [budgetFood, setbudgetFood] = useState(0);
  // const [transactionFood, setTransactionsFood] = useState(0);
  // const [descriptionFood, setDescFood] = useState("");

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
              <AccomodationTab
                budget={budget}
                setbudget={setbudget}
                //
                transaction={transaction}
                setTransactions={setTransactions}
                description={description}
                setDesc={setDesc}
              />
              {/* ------------------ this can be deleted later
                <FoodTab
                budget={budgetFood}
                setbudget={setbudgetFood}
                transaction={transactionFood}
                setTransactions={setTransactionsFood}
                description={descriptionFood}
                setDesc={setDescFood}
              /> */}
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
    //  <div>
    /* <AccomodationTab
          budget={budget}
          setbudget={setbudget}
          transaction={transaction}
          setTransactions={setTransactions}
          description={description}
          setDesc={setDesc}
        />
        <FoodTab
          budget={budgetFood}
          setbudget={setbudgetFood}
          transaction={transactionFood}
          setTransactions={setTransactionsFood}
          description={descriptionFood}
          setDesc={setDescFood}
        /> */
    /* </div>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => renderUser(user))
        ) : (
          <p>No users found</p>
        )}
      </ul>

      <div>
        <button>Add</button>
      </div> */
    /* </div> */
  );
}

export default App;
