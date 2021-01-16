import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./Redux/utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./Redux/actions/authActions";
import { decode } from "jsonwebtoken";
import store from "./Redux/store";

// PAGES
import BudgetPage from "./components/expense_tab/BudgetPage";
import SubmitBudgetPage from "./pages/SubmitBudgets";
import budgetCategoriesArry from "./budgetCategoriesArray";
import NavBar from "./components/Navbar";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Landing from "./pages/Login/Landing";
import PrivateRoute from "./PrivateRoute";

// >>>> checking if a user is loged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  const auth = useSelector((state) => state.auth);
  const [budget, setbudget] = useState(0);

  //>>>> this will be used for inputing the expenses/transactions and viewing the transactions:
  const [transaction, setTransactions] = useState(0);
  const [description, setDesc] = useState("");

  return (
    <div>
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
              <SubmitBudgetPage budgetCategoriesArray={budgetCategoriesArry} />
            </React.Fragment>
          )}
        />
        {/* LOGIN PART */}
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
        <Route exact path="/login" component={Login} render={() => <Login />} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/landing" component={Landing} />
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
    </div>
  );
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(App);
