import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
// import Dropdown from "./Dropdown.js";
import MenuIcon from "@material-ui/icons/Menu";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  //   const onMouseEnter = () => {
  //     console.log("testMouseEnter");
  //     if (window.innerWidth < 960) {
  //       setDropdown(false);
  //     } else {
  //       setDropdown(true);
  //     }
  //     console.log("testMouseEnter");
  //   };
  //   const dropClick = () => {
  //     if (window.innerWidth < 960) {
  //       setDropdown(!dropdown);
  //     }
  //   };
  //   const onMouseLeave = () => {
  //     console.log("testMouseLeave");
  //     if (window.innerWidth < 960) {
  //       setDropdown(false);
  //     } else {
  //       setDropdown(false);
  //     }
  //   };

  return (
    <React.Fragment>
      <nav className="navBar-2">
        <Link to="/" className="navbar-logo">
          HOME
        </Link>
        <div onClick={handleClick}>
          <MenuIcon style={{ color: "white" }} />
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/allbooks" className="nav-links" onClick={closeMenu}>
              Books
            </Link>
          </li>
          <li
            className="nav-item"
            // onMouseOver={onMouseOver}
            // onClick={dropClick}
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
          >
            <p className="nav-links categories">Categories {`>`}</p>
            {/* {dropdown && <Dropdown />}
            {console.log("dropdown =" + dropdown)} */}
          </li>
          {/* {dropdown === window.innerWidth < 960 ? (
            <li className="space-dropdown"></li>
          ) : null} */}

          <li className="nav-item">
            <Link to="/bookcase" className="nav-links" onClick={closeMenu}>
              Bookcase
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMenu}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};
export default NavBar;

// import React from "react";
// import { Link } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <div>
//       <div className="navbar-fixed">
//         <nav className="z-depth-0">
//           <div className="nav-wrapper white">
//             <Link
//               to="/"
//               style={{
//                 fontFamily: "monospace",
//               }}
//               className="col s5 brand-logo center black-text"
//             >
//               <i className="material-icons">code</i>
//               MERN
//             </Link>
//             <Link
//               to="/budgetInfo"
//               style={{
//                 fontFamily: "monospace",
//               }}
//               className="col s5 brand-logo center black-text"
//             >
//               <i className="material-icons">code</i>
//               MERN
//             </Link>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default NavBar;
