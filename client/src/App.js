import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./Redux/utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./Redux/actions/authActions";
import store from "./Redux/store";
import { Provider } from "react-redux";

// PAGES
import BudgetPage from "./components/expense_tab/BudgetPage";
import SubmitBudgetPage from "./pages/SubmitBudgetsPage";
import budgetCategoriesArry from "./budgetCategoriesArray";
import NavBar from "./components/Navbar";
import About from "./pages/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Landing from "./pages/Login/Landing";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import Generator from "./pages/Generator";

import "./pages/Login/main.css";
import "./components/budgetInfo/InfoForm.css";
import PostRegister from "./pages/PostRegistration";

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
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Route
            exact
            path="/home"
            render={() => (
              <React.Fragment>
                <NavBar />
                <Home />
              </React.Fragment>
            )}
          />

          <Route
            exact
            path="/login"
            component={Login}
            render={() => <Login />}
          />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/postRegister"
            component={PostRegister}
            render={() => <PostRegister />}
          />

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

          <Switch>
            <PrivateRoute exact path="/landing" component={Landing} />
            <PrivateRoute
              exact
              path="/budgetInfo"
              component={() => (
                <React.Fragment>
                  <NavBar />
                  <SubmitBudgetPage
                    budgetCategoriesArray={budgetCategoriesArry}
                  />
                </React.Fragment>
              )}
            />
            <PrivateRoute
              exact
              path="/generator"
              component={() => (
                <React.Fragment>
                  <NavBar />
                  <Generator />
                </React.Fragment>
              )}
            />
            <PrivateRoute
              exact
              path="/expenseTracker"
              component={() => (
                <React.Fragment>
                  <NavBar />
                  <BudgetPage />
                </React.Fragment>
              )}
            />
          </Switch>
        </Router>
      </Provider>
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
