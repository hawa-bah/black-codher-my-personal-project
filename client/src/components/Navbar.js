import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../stylesheets/NavBar.css";
import MenuIcon from "@material-ui/icons/Menu";
import { connect, useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/actions/authActions";
import { Button } from "@material-ui/core";
const styles = {
  largeIcon: {
    width: 60,
    height: 60,
    fontSize: "xx-large",
  },
};

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const clickLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    if (!auth.user.name) {
      window.location.href = "./";
    }
  };

  return (
    <React.Fragment>
      <div className="navBar-2">
        <div>
          <div className="navBar-onView">
            <Link to="/">
              <img
                src="/images/main-logo.png"
                alt="logo-of-the-app-plane-on-a-purse-on-front-of-a-cloud"
                style={{ maxHeight: "60px" }}
              />
            </Link>
            <div onClick={handleClick}>
              <MenuIcon
                style={{
                  backgroundColor: "white",
                  minWidth: "30px",
                  borderRadius: "20px",
                  color: "black",
                }}
                style={styles.largeIcon}
              />
            </div>
          </div>

          <ul
            className={click ? "nav-menu active" : "nav-menu"}
            style={{ zIndex: 5, textDecoration: "none" }}
          >
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMenu}>
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/budgetInfo" className="nav-links" onClick={closeMenu}>
                View your plans
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/expenseTracker/TransactionForm"
                className="nav-links"
                onClick={closeMenu}
              >
                Submit a transaction
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/expenseTracker/TransactionsList"
                className="nav-links"
                onClick={closeMenu}
              >
                List of transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/expenseTracker/BudgetCategories"
                className="nav-links"
                onClick={closeMenu}
              >
                View the state of your budgets
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/landing"
                className="nav-links categories"
                onClick={closeMenu}
              >
                Account
              </Link>
            </li>

            <li className="nav-item">
              <div
                className="action"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  padding: "30px",
                }}
              >
                <Button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    backgroundColor: "white",
                  }}
                  onClick={(e) => clickLogout(e)}
                >
                  Logout
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
