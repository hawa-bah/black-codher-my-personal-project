import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
// import Dropdown from "./Dropdown.js";
import MenuIcon from "@material-ui/icons/Menu";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  return (
    <React.Fragment>
      <div className="navBar-2">
        <div>
          <div className="navBar-onView">
            <Link to="/home" className="navbar-logo" style={{ color: "black" }}>
              HOME
            </Link>
            <div onClick={handleClick}>
              <MenuIcon style={{ color: "black" }} />
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
          </div>

          <ul
            className={click ? "nav-menu active" : "nav-menu"}
            style={{ zIndex: 5, textDecoration: "none" }}
          >
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMenu}>
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/expenseTracker"
                className="nav-links"
                onClick={closeMenu}
              >
                Expenses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/budgetInfo" className="nav-links" onClick={closeMenu}>
                View your plans
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
