import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./NavBar.css";
import MenuIcon from "@material-ui/icons/Menu";
const styles = {
  largeIcon: {
    width: 60,
    height: 60,
    fontSize: "xx-large",
  },
};

const NavBar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  return (
    <React.Fragment>
      <div className="navBar-2">
        <div>
          <div className="navBar-onView">
            <Link to="/">
              <img
                src="/TIRA-removebg-preview.png"
                alt="logo"
                style={{ maxHeight: "60px" }}
              />
            </Link>
            <div
              onClick={handleClick}
              // style={{
              //   backgroundColor: "white",
              //   padding: "10px",
              //   borderRadius: "10px",
              // }}
            >
              <MenuIcon
                style={{
                  backgroundColor: "white",
                  minWidth: "30px",
                  borderRadius: "20px",
                  color: "black",
                }}
                style={styles.largeIcon}
              />
              {/* <i
                style={{ minWidth: "400px" }}
                className={click ? "fas fa-times" : "fas fa-bars"}
              /> */}
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

            {/* <li className="nav-item">
              <Link to="/register" className="nav-links" onClick={closeMenu}>
                Sign Out
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
export default NavBar;
