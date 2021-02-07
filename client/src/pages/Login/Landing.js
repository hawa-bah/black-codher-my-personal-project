import React from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/actions/authActions";

import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar";

const Landing = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="Landing-div">
      <NavBar />
      <div>
        <div className="valign-wrapper">
          <div className="landing-container ">
            <div className="landing-content">
              <img
                src="/images/account-logo.png"
                alt="user-icon"
                className="img-account"
              ></img>
              <div className="landing-text" style={{ color: "white" }}>
                <h3>
                  <b>Hey there,</b>{" "}
                  {auth.user.name ? auth.user.name.split(" ")[0] : null}!
                  <p>
                    Welcome to{" "}
                    <span style={{ fontFamily: "monospace" }}>TIRA</span> 👏
                  </p>
                </h3>
              </div>
              <div className="landing-options">
                <div>
                  <Link to="/budgetInfo" className="landing-link">
                    Check your plans
                  </Link>
                </div>
                {/* <div>
                  <Link to="/expenseTracker" className="landing-link">
                    Track your expenses
                  </Link>
                </div> */}
                <div>
                  <Link
                    to="/expenseTracker/TransactionForm"
                    className="landing-link"
                  >
                    Submit a transaction
                  </Link>
                </div>
                <div>
                  <Link
                    to="/expenseTracker/BudgetCategories"
                    className="landing-link"
                  >
                    View the state of your budgets
                  </Link>
                </div>
                <div>
                  <Link
                    to="/expenseTracker/TransactionsList"
                    className="landing-link"
                  >
                    View your expenses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Landing);
