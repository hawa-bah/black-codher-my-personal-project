import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// PAGES
import BudgetPage from "./components/expense_tab/BudgetPage";
import SubmitBudgetPage from "./pages/SubmitBudgets";
import budgetCategoriesArry from "./budgetCategoriesArray";
import NavBar from "./components/Navbar";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";

function App() {
  const [budget, setbudget] = useState(0);

  //>>>> this will be used for inputing the expenses/transactions and viewing the transactions:
  const [transaction, setTransactions] = useState(0);
  const [description, setDesc] = useState("");

  return (
    <div>
      <Provider store={store}>
        <Router>
          <Route
            exact
            path="/expenseTracker"
            render={() => (
              <React.Fragment>
                <NavBar />

                <BudgetPage
                  budget={budget}
                  setbudget={setbudget}
                  ///
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
                <NavBar />
                <SubmitBudgetPage
                  budgetCategoriesArray={budgetCategoriesArry}
                />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/login-register"
            render={() => (
              <React.Fragment>
                <NavBar />
                <Auth />
              </React.Fragment>
            )}
          />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/register" render={() => <Register />} />
          <Route
            exact
            path="/about"
            render={() => (
              <React.Fragment>
                <NavBar />
                <About />
              </React.Fragment>
            )}
          />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
