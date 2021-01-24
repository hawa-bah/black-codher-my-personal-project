import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./Redux/utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./Redux/actions/authActions";
import store from "./Redux/store";

// PAGES
import BudgetPage from "./components/expense_tab/BudgetPage";
import SubmitBudgetPage from "./pages/SubmitBudgetsPage";
import budgetCategoriesArry from "./budgetCategoriesArray";
import NavBar from "./components/Navbar";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Landing from "./pages/Login/Landing";
import PrivateRoute from "./PrivateRoute";

import "./pages/Login/main.css";
import "./components/budgetInfo/InfoForm.css";
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
  //>>>> this will be used for inputing the expenses/transactions and viewing the transactions:
  const [transaction, setTransactions] = useState(0);
  const [description, setDesc] = useState("");

  return (
    <div>
      {/* <div className="darken overlay-1"></div> */}

      <Router>
        <Route
          exact
          path="/expenseTracker"
          render={() => (
            <React.Fragment>
              <NavBar />

              <BudgetPage
                transaction={transaction} //> used
                setTransactions={setTransactions} //> used
                description={description} //> used
                setDesc={setDesc} //> used
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
              <Auth />
            </React.Fragment>
          )}
        />
        <Route exact path="/login" component={Login} render={() => <Login />} />
        <Route exact path="/register" component={Register} />
        {/*>>>> So that only one route is rendered */}
        <Switch>
          <PrivateRoute exact path="/landing" component={Landing} />
        </Switch>
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
